using server.Data;
using server.Models;
using server.Responses;
using server.Utils;
using server.Dtos;
using Microsoft.EntityFrameworkCore;
using server.Constants;

namespace server.Endpoints
{
    public static class UmCategoriaExt
    {
        public static UmCategoriaRes CreateUmCategoriaRes(UmCategoria cat)
        {
            return new UmCategoriaRes
            {
                Id = cat.Id,
                Nombre = cat.Nombre,
                Agrupable = cat.Agrupable,
                IdUsrCreacion = cat.IdUsrCreacion,
                IdUsrModificacion = cat.IdUsrModificacion,
                Estado = cat.Estado,
                FechaCreacion = cat.FechaCreacion,
                FechaModificacion = cat.FechaModificacion
            };
        }
         public static IQueryable<UmCategoria> Includes(this IQueryable<UmCategoria> query)
        {
            return query;
        }
        public static IQueryable<UmCategoriaRes> GetRes(this IQueryable<UmCategoria> query)
        {
            return query.Includes().Select(entity => CreateUmCategoriaRes(entity));
        }

        public static void UmCategoriaEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "UmCategoria";
            string baseUrl = "/umcategoria";

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var unidadMedida = await db.UmCategoria.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.UmCategoria.GET, unidadMedida);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var unidadMedida = await db.UmCategoria.IgnoreQueryFilters().Select(cat => CreateUmCategoriaRes(cat)).ToListAsync();
                return res.SuccessResponse(Messages.UmCategoria.GET, unidadMedida);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                return await db.UmCategoria.Where(pa => pa.Id == id).Select(cat => CreateUmCategoriaRes(cat)).FirstOrDefaultAsync() is UmCategoriaRes e
                    ? res.SuccessResponse(Messages.UmCategoria.FIND, e)
                    : res.NotFoundResponse(Messages.UmCategoria.NOTFOUND);
            }).RequireAuthorization().WithTags(tag);

            app.MapPost(baseUrl, async (UmUmCategoriaDTO cat, DBContext db) =>
            {
                var exit = await db.UmCategoria.AnyAsync(e => e.Nombre == cat.Nombre);
                if (exit) return res.BadRequestResponse(Messages.UmCategoria.EXISTS);
                UmCategoria unidadMedida = new()
                {
                    Nombre = cat.Nombre,
                    Agrupable = cat.Agrupable
                };
                db.UmCategoria.Add(unidadMedida);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.UmCategoria.CREATED, CreateUmCategoriaRes(unidadMedida));
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/{id}", async (int id, UmCategoria cat, DBContext db) =>
            {
                var exit = await db.UmCategoria.AnyAsync(e => e.Nombre == cat.Nombre && e.Id != id);
                if (exit) return res.BadRequestResponse(Messages.UmCategoria.EXISTS);
                var unidadMedida = await db.UmCategoria.FindAsync(id);
                if (unidadMedida is null) return res.NotFoundResponse(Messages.UmCategoria.NOTFOUND);
                unidadMedida.Nombre = cat.Nombre;
                unidadMedida.Agrupable = cat.Agrupable;
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.UmCategoria.UPDATED, CreateUmCategoriaRes(unidadMedida));
            }).RequireAuthorization().WithTags(tag);

            app.MapDelete(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                var unidadMedida = await db.UmCategoria.FindAsync(id);
                if (unidadMedida is null) return res.NotFoundResponse(Messages.UmCategoria.NOTFOUND);
                db.UmCategoria.Remove(unidadMedida);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.UmCategoria.DELETED, "");
            }).RequireAuthorization().WithTags(tag);
        }
    }
}