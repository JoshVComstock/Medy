using server.Data;
using server.Models;
using server.Responses;
using server.Utils;
using server.Dtos;
using Microsoft.EntityFrameworkCore;
using server.Constants;

namespace server.Endpoints
{
    public static class CiudadExt
    {
        public static CiudadRes CreateCiudadRes(Ciudad c)
        {
            return new CiudadRes
            {
                Id = c.Id,
                Nombre = c.Nombre,
                IdUsrCreacion = c.IdUsrCreacion,
                IdUsrModificacion = c.IdUsrModificacion,
                Estado = c.Estado,
                FechaCreacion = c.FechaCreacion,
                FechaModificacion = c.FechaModificacion
            };
        }
        public static IQueryable<Ciudad> Includes(this IQueryable<Ciudad> query)
        {
            return query;
        }
        public static IQueryable<CiudadRes> GetRes(this IQueryable<Ciudad> query)
        {
            return query.Includes().Select(entity => CreateCiudadRes(entity));
        }
        public static void CiudadEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Ciudad";
            string baseUrl = "/ciudad";

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var ciudad = await db.Ciudad.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.Ciudad.GET, ciudad);
            }).WithTags(tag);

            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var ciudad = await db.Ciudad.IgnoreQueryFilters().Select(pv => CreateCiudadRes(pv)).ToListAsync();
                return res.SuccessResponse(Messages.Ciudad.GET, ciudad);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                return await db.Ciudad.Where(pv => pv.Id == id).Select(pv => CreateCiudadRes(pv)).FirstOrDefaultAsync() is CiudadRes e
                    ? res.SuccessResponse(Messages.Ciudad.FIND, e)
                    : res.NotFoundResponse(Messages.Ciudad.NOTFOUND);
            }).RequireAuthorization().WithTags(tag);


            app.MapPost(baseUrl, async (CiudadDTO C, DBContext db) =>
            {
                Ciudad ciudad = new()
                {
                    Nombre = C.Nombre,
                };
                db.Ciudad.Add(ciudad);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.Ciudad.CREATED, CreateCiudadRes(ciudad));
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/{id}", async (int id, CiudadDTO pv, DBContext db) =>
            {
                var ciudad = await db.Ciudad.FindAsync(id);
                if (ciudad is null) return res.NotFoundResponse(Messages.Ciudad.NOTFOUND);

                ciudad.Nombre = pv.Nombre;
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.Ciudad.UPDATED, CreateCiudadRes(ciudad));
            }).RequireAuthorization().WithTags(tag);

            app.MapDelete(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                var ciudad = await db.Ciudad.FindAsync(id);
                if (ciudad is null) return res.NotFoundResponse(Messages.Ciudad.NOTFOUND);
                db.Ciudad.Remove(ciudad);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.Ciudad.DELETED, "");
            }).RequireAuthorization().WithTags(tag);
        }
    }
}
