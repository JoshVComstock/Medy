using server.Data;
using server.Models;
using server.Responses;
using server.Utils;
using server.Dtos;
using Microsoft.EntityFrameworkCore;
using server.Constants;

namespace server.Endpoints
{
    public static class MunicipioExt
    {
        public static MunicipioRes CreateMunicipioRes(Municipio mun)
        {
            return new MunicipioRes
            {
                Id = mun.Id,
                IdProvincia = mun.IdProvincia,
                Provincia = mun.Provincia.Nombre,
                Nombre = mun.Nombre,
                IdUsrCreacion = mun.IdUsrCreacion,
                IdUsrModificacion = mun.IdUsrModificacion,
                Estado = mun.Estado,
                FechaCreacion = mun.FechaCreacion,
                FechaModificacion = mun.FechaModificacion
            };
        }
        public static IQueryable<Municipio> Includes(this IQueryable<Municipio> query)
        {
            return query
            .Include(m => m.Provincia);
        }
        public static IQueryable<MunicipioRes> GetRes(this IQueryable<Municipio> query)
        {
            return query.Includes().Select(entity => CreateMunicipioRes(entity));
        }
        public static void MunicipioEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Municipio";
            string baseUrl = "/municipio";

          
            app.MapGet(baseUrl, async (DBContext db) =>
           {
               var Municipio = await db.Municipio.GetRes().ToListAsync();
               return res.SuccessResponse(Messages.Municipio.GET, Municipio);
           }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var municipio = await db.Municipio.IgnoreQueryFilters().Select(mun => CreateMunicipioRes(mun)).ToListAsync();
                return res.SuccessResponse(Messages.Municipio.GET, municipio);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                return await db.Municipio.Where(mun => mun.Id == id).Select(mun => CreateMunicipioRes(mun)).FirstOrDefaultAsync() is MunicipioRes e
                    ? res.SuccessResponse(Messages.Municipio.FIND, e)
                    : res.NotFoundResponse(Messages.Municipio.NOTFOUND);
            }).RequireAuthorization().WithTags(tag);

            app.MapPost(baseUrl, async (MunicipioDTO mun, DBContext db) =>
            {
                var provi = await db.Provincia.FindAsync(mun.IdProvincia);
                if (provi is null) return res.NotFoundResponse(Messages.Provincia.NOTFOUND);
                Municipio municipio = new()
                {
                    Nombre = mun.Nombre,
                    Provincia = provi,
                };
                db.Municipio.Add(municipio);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.Municipio.CREATED, CreateMunicipioRes(municipio));
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/{id}", async (int id, MunicipioDTO mun, DBContext db) =>
            {
                var municipio = await db.Municipio.FindAsync(id);
                if (municipio is null) return res.NotFoundResponse(Messages.Municipio.NOTFOUND);
                var provi = await db.Provincia.FindAsync(mun.IdProvincia);
                if (provi is null) return res.NotFoundResponse(Messages.Provincia.NOTFOUND);
                municipio.Provincia = provi;
                municipio.Nombre = mun.Nombre;
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.Municipio.UPDATED, CreateMunicipioRes(municipio));
            }).RequireAuthorization().WithTags(tag);

            app.MapDelete(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                var municipio = await db.Municipio.FindAsync(id);
                if (municipio is null) return res.NotFoundResponse(Messages.Municipio.NOTFOUND);
                db.Municipio.Remove(municipio);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.Municipio.DELETED, "");
            }).RequireAuthorization().WithTags(tag);
        }
    }
}
