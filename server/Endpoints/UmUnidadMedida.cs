using server.Data;
using server.Models;
using server.Responses;
using server.Utils;
using server.Dtos;
using Microsoft.EntityFrameworkCore;
using server.Constants;

namespace server.Endpoints
{
    public static class UnidadMedidaExt
    {
        public static UmUnidadMedidaRes CreateUnidadMedidaRes(UmUnidadMedida uni)
        {
            return new UmUnidadMedidaRes
            {
                Id = uni.Id,
                Categoria = UmCategoriaExt.CreateUmCategoriaRes(uni.Categoria),
                Nombre = uni.Nombre,
                Tipo = uni.Tipo,
                Ratio = uni.Ratio,
                Redondeo = uni.Redondeo,
                IdUsrCreacion = uni.IdUsrCreacion,
                IdUsrModificacion = uni.IdUsrModificacion,
                Estado = uni.Estado,
                FechaCreacion = uni.FechaCreacion,
                FechaModificacion = uni.FechaModificacion
            };
        }
        public static IQueryable<UmUnidadMedida> Includes(this IQueryable<UmUnidadMedida> query)
        {
            return query
            .Include(c => c.Categoria);
        }
        public static IQueryable<UmUnidadMedidaRes> GetRes(this IQueryable<UmUnidadMedida> query)
        {
            return query.Includes().Select(entity => CreateUnidadMedidaRes(entity));
        }
        public static void UmUnidadMedidaEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "UnidadMedida";
            string baseUrl = "/unidadmedida";

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var unidadMedida = await db.UmUnidadMedida.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.UmUnidadMedida.GET, unidadMedida);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var unidadMedida = await db.UmUnidadMedida.IgnoreQueryFilters().Select(uni => CreateUnidadMedidaRes(uni)).ToListAsync();
                return res.SuccessResponse(Messages.UmUnidadMedida.GET, unidadMedida);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/getByCategoria/{idCategoria:int}", async (int idCategoria, DBContext db) =>
            {
                var efectivos = await db.UmUnidadMedida.Where(cda => cda.IdCategoria == idCategoria).GetRes().ToListAsync();
                return res.SuccessResponse(Messages.Efectivo.GET, efectivos);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                return await db.UmUnidadMedida.Where(pa => pa.Id == id).Select(uni => CreateUnidadMedidaRes(uni)).FirstOrDefaultAsync() is UmUnidadMedidaRes e
                    ? res.SuccessResponse(Messages.UmUnidadMedida.FIND, e)
                    : res.NotFoundResponse(Messages.UmUnidadMedida.NOTFOUND);
            }).RequireAuthorization().WithTags(tag);

            app.MapPost(baseUrl, async (UmUnidadMedidaDTO uni, DBContext db) =>
            {
                var exit = await db.UmUnidadMedida.AnyAsync(e => e.Nombre == uni.Nombre);
                if (exit) return res.BadRequestResponse(Messages.UmUnidadMedida.EXISTS);
                var cate = await db.UmCategoria.FindAsync(uni.IdCategoria);
                if (cate is null) return res.NotFoundResponse(Messages.UmCategoria.NOTFOUND);
                UmUnidadMedida unidadMedida = new()
                {
                    Categoria = cate,
                    Nombre = uni.Nombre,
                    Tipo = uni.Tipo,
                    Ratio = uni.Ratio,
                    Redondeo = uni.Redondeo,
                };
                db.UmUnidadMedida.Add(unidadMedida);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.UmUnidadMedida.CREATED, CreateUnidadMedidaRes(unidadMedida));
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/{id}", async (int id, UmUnidadMedida uni, DBContext db) =>
            {
                var exit = await db.UmUnidadMedida.AnyAsync(e => e.Nombre == uni.Nombre && e.Id != id);
                if (exit) return res.BadRequestResponse(Messages.UmUnidadMedida.EXISTS);
                var unidadMedida = await db.UmUnidadMedida.FindAsync(id);
                if (unidadMedida is null) return res.NotFoundResponse(Messages.UmUnidadMedida.NOTFOUND);
                var categoria = await db.UmCategoria.FindAsync(uni.IdCategoria);
                if (categoria is null) return res.NotFoundResponse(Messages.UmCategoria.NOTFOUND);
                unidadMedida.Categoria = categoria;
                unidadMedida.Nombre = uni.Nombre;
                unidadMedida.Ratio = uni.Ratio;
                unidadMedida.Redondeo = uni.Redondeo;
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.UmUnidadMedida.UPDATED, CreateUnidadMedidaRes(unidadMedida));
            }).RequireAuthorization().WithTags(tag);

            app.MapDelete(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                var unidadMedida = await db.UmUnidadMedida.FindAsync(id);
                if (unidadMedida is null) return res.NotFoundResponse(Messages.UmUnidadMedida.NOTFOUND);
                db.UmUnidadMedida.Remove(unidadMedida);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.UmUnidadMedida.DELETED, "");
            }).RequireAuthorization().WithTags(tag);
        }
    }
}