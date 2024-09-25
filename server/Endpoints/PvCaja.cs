using server.Data;
using server.Models;
using server.Responses;
using server.Utils;
using server.Dtos;
using Microsoft.EntityFrameworkCore;
using server.Constants;
using System.Text.RegularExpressions;
using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Reflection.Metadata;
using Microsoft.OpenApi.Models;

namespace server.Endpoints
{
    public static class PvCajaExt
    {
        public static PvCajaRes CreateRes(PvCaja pc)
        {
            return new PvCajaRes
            {
                Id = pc.Id,
                IdUsrCreacion = pc.IdUsrCreacion,
                IdUsrModificacion = pc.IdUsrModificacion,
                Estado = pc.Estado,
                FechaCreacion = pc.FechaCreacion,
                FechaModificacion = pc.FechaModificacion,
                Cantidad = pc.Cantidad,
                Descripcion = pc.Descripcion,
                Fecha = pc.Fecha,
                /*       IdMoneda = pc.IdMoneda,
                      Moneda = RecMonedaExt.CreateMonedaRes(pc.Moneda),  */
                IdEfectivo = pc.IdEfectivo,
                Efectivo = PvEfectivoExt.CreateEfectivoRes(pc.Efectivo),
                Tipo = pc.Tipo,
                Valor = pc.Valor
            };
        }
        public static IQueryable<PvCaja> Includes(this IQueryable<PvCaja> query)
        {
            return query
            /*         .Include(e => e.Moneda)  */
            .Include(e => e.Efectivo).ThenInclude(e => e.Moneda);
        }
        public static IQueryable<PvCajaRes> GetRes(this IQueryable<PvCaja> query)
        {
            return query.Includes().Select(entity => CreateRes(entity));
        }

        public static void PvCajaEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Caja";
            string baseUrl = "/pvCaja";

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var productoCategoria = await db.PvCaja.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.PvCaja.GET, productoCategoria);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/today", async (DBContext db, DateTime fecha) =>
            {
                //get current date
                var fechaActual = DateOnly.FromDateTime(fecha.Date);
                var productoCategoria = await db.PvCaja
                                                .Where(d => d.Fecha == fechaActual)
                                                .GetRes()
                                                .ToListAsync();
                return res.SuccessResponse(Messages.PvCaja.GET, productoCategoria);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var productoCategoria = await db.PvCaja.IgnoreQueryFilters().GetRes().ToListAsync();
                return res.SuccessResponse(Messages.PvCaja.GET, productoCategoria);
            }).RequireAuthorization().WithTags(tag);


            app.MapGet(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                return await db.PvCaja.Where(ca => ca.Id == id).GetRes().FirstOrDefaultAsync() is PvCajaRes e
                    ? res.SuccessResponse(Messages.PvCaja.FIND, e)
                    : res.NotFoundResponse(Messages.PvCaja.NOTFOUND);
            }).RequireAuthorization().WithTags(tag)
            .Produces<PvCajaRes>(StatusCodes.Status200OK);

            app.MapPost(baseUrl, async (List<PvCajaDTO> ca, DBContext db) =>
            {
                PvCaja[] cajas = new PvCaja[ca.Count];
                int index = 0;
                foreach (var item in ca)
                {
                    var fechaActual = DateOnly.FromDateTime(DateTime.UtcNow.Date);

                    var pvEfecttive = await db.PvEfectivo.FirstOrDefaultAsync(v => v.Id == item.IdEfectivo);

                    //if there is the caja, the type is cierre cause the user already saved a data
                    var caja = await db.PvCaja.FirstOrDefaultAsync(pc => pc.Fecha == fechaActual);
                    string typeCaja = "Apertura";
                    if (caja != null)
                    {
                        typeCaja = "Cierre";
                    }

                    /*             Match match = Regex.Match(pvEfecttive!.Descripcion, @"\d+(\.\d+)?");
                                double monto = 0;
                                if (match.Success)
                                {
                                    double number = Convert.ToDouble(match.Value, CultureInfo.InvariantCulture);
                                    monto = number * item.Cantidad;
                                } */
                    double monto = GetNumberOfString.CalculateMonto(pvEfecttive!.Descripcion, item.Cantidad);

                    PvCaja Caja = new()
                    {
                        Cantidad = item.Cantidad,
                        Descripcion = pvEfecttive.Descripcion,
                        Fecha = fechaActual,
                        /* Moneda = m, */
                        Tipo = typeCaja,
                        Valor = Convert.ToDouble(monto),
                        Efectivo = pvEfecttive
                    };
                    db.PvCaja.Add(Caja);
                    cajas[index] = Caja;
                    index++;
                    await db.SaveChangesAsync();
                }
                return res.SuccessResponse(Messages.PvCaja.CREATED, "");
            })
            .RequireAuthorization()
            .WithTags(tag)
            .WithMetadata(new SwaggerOperationAttribute { Summary = "Openining/Closing cash register(id is null)" });


            app.MapPost(baseUrl + "/edit", async (PvCajaDTO[] ca, DBContext db) =>
            {
                foreach (var item in ca)
                {
                    var caja = await db.PvCaja.Includes().FirstOrDefaultAsync(pc => pc.Id == item.Id);
                    if (caja is null) return res.NotFoundResponse(Messages.PvCaja.NOTFOUND);
                    /* var m = await db.RecMoneda.FindAsync(ca.IdMoneda);
                    if (m is null) return res.NotFoundResponse(Messages.Moneda.NOTFOUND); */

                    var currentDate = DateOnly.FromDateTime(DateTime.UtcNow.Date);

                    var pvEfecttive = await db.PvEfectivo.FirstOrDefaultAsync(v => v.Id == item.IdEfectivo);

                    double monto = GetNumberOfString.CalculateMonto(pvEfecttive!.Descripcion, item.Cantidad);

                    caja.Cantidad = item.Cantidad;
                    caja.Descripcion = pvEfecttive.Descripcion;
                    caja.Fecha = currentDate;
                    caja.Valor = monto;
                    caja.Efectivo = pvEfecttive;

                    await db.SaveChangesAsync();
                }
                return res.SuccessResponse(Messages.PvCaja.UPDATED, "");
            })
            .RequireAuthorization()
            .WithTags(tag)
            .WithMetadata(new SwaggerOperationAttribute { Summary = "Edit cash register" });

            app.MapDelete(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                var Config = await db.PvCaja.FindAsync(id);
                if (Config is null) return res.NotFoundResponse(Messages.PvCaja.NOTFOUND);
                db.PvCaja.Remove(Config);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.PvCaja.DELETED, "");
            }).RequireAuthorization().WithTags(tag);
        }
    }
}