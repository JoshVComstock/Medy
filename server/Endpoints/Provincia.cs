using server.Data;
using server.Models;
using server.Responses;
using server.Utils;
using server.Dtos;
using Microsoft.EntityFrameworkCore;
using server.Constants;

namespace server.Endpoints
{
    public static class ProvinciaExt
    {
        public static ProvinciaRes CreateProvinciaRes(Provincia pv)
        {
            return new ProvinciaRes
            {
                Id = pv.Id,
                IdCiudad = pv.IdCiudad,
                Ciudad = CiudadExt.CreateCiudadRes(pv.Ciudad),
                Nombre = pv.Nombre,
                IdUsrCreacion = pv.IdUsrCreacion,
                IdUsrModificacion = pv.IdUsrModificacion,
                Estado = pv.Estado,
                FechaCreacion = pv.FechaCreacion,
                FechaModificacion = pv.FechaModificacion
            };
        }
        public static IQueryable<Provincia> Includes(this IQueryable<Provincia> query)
        {
            return query
            .Include(m => m.Ciudad);
        }
        public static IQueryable<ProvinciaRes> GetRes(this IQueryable<Provincia> query)
        {
            return query.Includes().Select(entity => CreateProvinciaRes(entity));
        }
        public static void ProvinciaEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Provincia";
            string baseUrl = "/provincia";

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var Provincia = await db.Provincia.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.Provincia.GET, Provincia);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var provincia = await db.Provincia.IgnoreQueryFilters().Select(pv => CreateProvinciaRes(pv)).ToListAsync();
                return res.SuccessResponse(Messages.Provincia.GET, provincia);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                return await db.Provincia.Where(pv => pv.Id == id).Select(pv => CreateProvinciaRes(pv)).FirstOrDefaultAsync() is ProvinciaRes e
                    ? res.SuccessResponse(Messages.Provincia.FIND, e)
                    : res.NotFoundResponse(Messages.Provincia.NOTFOUND);
            }).RequireAuthorization().WithTags(tag);

            app.MapPost(baseUrl, async (ProvinciaDTO pv, DBContext db) =>
            {
                var ciu = await db.Ciudad.FindAsync(pv.IdCiudad);
                if (ciu is null) return res.NotFoundResponse(Messages.Ciudad.NOTFOUND);
                Provincia provincia = new()
                {
                    Nombre = pv.Nombre,
                    Ciudad = ciu,
                };
                db.Provincia.Add(provincia);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.Provincia.CREATED, CreateProvinciaRes(provincia));
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/{id}", async (int id, ProvinciaDTO pv, DBContext db) =>
            {
                var provincia = await db.Provincia.FindAsync(id);
                if (provincia is null) return res.NotFoundResponse(Messages.Provincia.NOTFOUND);
                var ciu = await db.Ciudad.FindAsync(pv.IdCiudad);
                if (ciu is null) return res.NotFoundResponse(Messages.Ciudad.NOTFOUND);
                provincia.Ciudad = ciu;
                provincia.Nombre = pv.Nombre;
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.Provincia.UPDATED, CreateProvinciaRes(provincia));
            }).RequireAuthorization().WithTags(tag);

            app.MapDelete(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                var provincia = await db.Provincia.FindAsync(id);
                if (provincia is null) return res.NotFoundResponse(Messages.Provincia.NOTFOUND);
                db.Provincia.Remove(provincia);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.Provincia.DELETED, "");
            }).RequireAuthorization().WithTags(tag);
        }
    }
}
