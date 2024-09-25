using server.Data;
using server.Models;
using server.Responses;
using server.Utils;
using server.Dtos;
using Microsoft.EntityFrameworkCore;
using server.Constants;

namespace server.Endpoints
{
    public static class RecMonedaExt
    {
        public static RecMonedaRes CreateMonedaRes(RecMoneda mo)
        {
            return new RecMonedaRes{
                Id = mo.Id,
                Codigo = mo.Codigo,
                Simbolo = mo.Simbolo,
                Nombre = mo.Nombre,
                Decimales = mo.Decimales,
                UnidadMonetaria = mo.UnidadMonetaria,
                SubUnidadMonetaria = mo.SubUnidadMonetaria,
                Redondeo = mo.Redondeo,
                IdUsrCreacion = mo.IdUsrCreacion,
                IdUsrModificacion = mo.IdUsrModificacion,
                Estado = mo.Estado,
                FechaCreacion = mo.FechaCreacion,
                FechaModificacion = mo.FechaModificacion
            };
        }
         public static IQueryable<RecMoneda> Includes(this IQueryable<RecMoneda> query)
        {
            return query;
        }
        public static IQueryable<RecMonedaRes> GetRes(this IQueryable<RecMoneda> query)
        {
            return query.Includes().Select(entity => CreateMonedaRes(entity));
        }

        public static void MonedaEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Moneda";
            string baseUrl = "/moneda";

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var moneda = await db.RecMoneda.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.Moneda.GET, moneda);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var moneda = await db.RecMoneda.IgnoreQueryFilters().Select(mon => CreateMonedaRes(mon)).ToListAsync();
                return res.SuccessResponse(Messages.Moneda.GET, moneda);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                return await db.RecMoneda.Where(pa => pa.Id == id).Select(mon => CreateMonedaRes(mon)).FirstOrDefaultAsync() is RecMonedaRes e
                    ? res.SuccessResponse(Messages.Moneda.FIND, e)
                    : res.NotFoundResponse(Messages.Moneda.NOTFOUND);
            }).RequireAuthorization().WithTags(tag);

            app.MapPost(baseUrl, async (RecMonedaDTO mon, DBContext db) =>
            {
                var exit = await db.RecMoneda.AnyAsync(e => e.Nombre == mon.Nombre);
                if (exit) return res.BadRequestResponse(Messages.Moneda.EXISTS);

                RecMoneda moneda = new()
                {
                    Codigo = mon.Codigo,
                    Simbolo = mon.Simbolo,
                    Nombre = mon.Nombre,
                    Decimales = mon.Decimales,
                    UnidadMonetaria = mon.UnidadMonetaria,
                    SubUnidadMonetaria = mon.SubUnidadMonetaria,
                    Redondeo = mon.Redondeo,
                };
                db.RecMoneda.Add(moneda);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.Moneda.CREATED, CreateMonedaRes(moneda));
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/{id}", async (int id, RecMonedaDTO mon, DBContext db) =>
            {
                var exit = await db.RecMoneda.AnyAsync(e => e.Nombre == mon.Nombre && e.Id != id);
                if (exit) return res.BadRequestResponse(Messages.Moneda.EXISTS);
                var moneda = await db.RecMoneda.FindAsync(id);
                if (moneda is null) return res.NotFoundResponse(Messages.Moneda.NOTFOUND);
                moneda.Codigo = mon.Codigo;
                moneda.Simbolo = mon.Simbolo;
                moneda.Nombre = mon.Nombre;
                moneda.Decimales = mon.Decimales;
                moneda.UnidadMonetaria = mon.UnidadMonetaria;
                moneda.SubUnidadMonetaria = mon.SubUnidadMonetaria;
                moneda.Redondeo = mon.Redondeo;
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.Moneda.UPDATED, CreateMonedaRes(moneda));
            }).RequireAuthorization().WithTags(tag);

            app.MapDelete(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                var moneda = await db.RecMoneda.FindAsync(id);
                if (moneda is null) return res.NotFoundResponse(Messages.Moneda.NOTFOUND);
                db.RecMoneda.Remove(moneda);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.Moneda.DELETED, "");
            }).RequireAuthorization().WithTags(tag);
        }
    }
}
