using server.Data;
using server.Models;
using server.Responses;
using server.Utils;
using server.Dtos;
using Microsoft.EntityFrameworkCore;
using server.Constants;

namespace server.Endpoints
{
    public static class PvEfectivoExt
    {
        public static PvEfectivoRes CreateEfectivoRes(PvEfectivo pv)
        {
            return new PvEfectivoRes
            {
                Id = pv.Id,
                Moneda = RecMonedaExt.CreateMonedaRes(pv.Moneda),
                Descripcion = pv.Descripcion,
                Valor = pv.Valor,
                IdUsrCreacion = pv.IdUsrCreacion,
                IdUsrModificacion = pv.IdUsrModificacion,
                Estado = pv.Estado,
                FechaCreacion = pv.FechaCreacion,
                FechaModificacion = pv.FechaModificacion
            };
        }
        public static IQueryable<PvEfectivo> Includes(this IQueryable<PvEfectivo> query)
        {
            return query
            .Include(m => m.Moneda);
        }
        public static IQueryable<PvEfectivoRes> GetRes(this IQueryable<PvEfectivo> query)
        {
            return query.Includes().Select(entity => CreateEfectivoRes(entity));
        }
        public static void EfectivoEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Efectivo";
            string baseUrl = "/efectivo";

            app.MapGet(baseUrl, async (DBContext db) =>
            {
              var moneda = await db.PvEfectivo.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.Efectivo.GET, moneda);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var efectivo = await db.PvEfectivo.IgnoreQueryFilters().Select(pv => CreateEfectivoRes(pv)).ToListAsync();
                return res.SuccessResponse(Messages.Efectivo.GET, efectivo);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                return await db.PvEfectivo.Where(pv => pv.Id == id).Select(pv => CreateEfectivoRes(pv)).FirstOrDefaultAsync() is PvEfectivoRes e
                    ? res.SuccessResponse(Messages.Efectivo.FIND, e)
                    : res.NotFoundResponse(Messages.Efectivo.NOTFOUND);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/getByMoneda/{idMoneda:int}", async (int idMoneda, DBContext db) =>
                     {
                         var efectivos = await db.PvEfectivo.Where(cda => cda.IdMoneda == idMoneda).GetRes().ToListAsync();
                         return res.SuccessResponse(Messages.Efectivo.GET, efectivos);
                     }).RequireAuthorization().WithTags(tag);

            app.MapPost(baseUrl, async (PvEfectivoDTO pv, DBContext db) =>
            {
                var mon = await db.RecMoneda.FindAsync(pv.IdMoneda);
                if (mon is null) return res.NotFoundResponse(Messages.Efectivo.NOTMONEDA);
                PvEfectivo efectivo = new()
                {
                    Descripcion = pv.Descripcion,
                    Valor = pv.Valor,
                    Moneda = mon
                };
                db.PvEfectivo.Add(efectivo);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.Efectivo.CREATED, CreateEfectivoRes(efectivo));
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/{id}", async (int id, PvEfectivoDTO pv, DBContext db) =>
            {
                var efectivo = await db.PvEfectivo.FindAsync(id);
                if (efectivo is null) return res.NotFoundResponse(Messages.Efectivo.NOTFOUND);
                var mon = await db.RecMoneda.FindAsync(pv.IdMoneda);
                if (mon is null) return res.NotFoundResponse(Messages.Efectivo.NOTMONEDA);
                efectivo.Moneda = mon;
                efectivo.Descripcion = pv.Descripcion;
                efectivo.Valor = pv.Valor;
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.Efectivo.UPDATED, CreateEfectivoRes(efectivo));
            }).RequireAuthorization().WithTags(tag);

            app.MapDelete(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                var efectivo = await db.PvEfectivo.FindAsync(id);
                if (efectivo is null) return res.NotFoundResponse(Messages.Efectivo.NOTFOUND);
                db.PvEfectivo.Remove(efectivo);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.Efectivo.DELETED, "");
            }).RequireAuthorization().WithTags(tag);
        }
    }
}
