using server.Data;
using server.Models;
using server.Responses;
using server.Utils;
using server.Dtos;
using Microsoft.EntityFrameworkCore;
using server.Constants;

namespace server.Endpoints
{
    public static class ProdCategoriaExt
    {
        public static ProdCategoriaRes CreateRes(ProdCategoria pc)
        {
            return new ProdCategoriaRes
            {
                Id = pc.Id,
                Nombre = pc.Nombre,
                IdPadre = pc.IdPadre,
                NombreCompleto = pc.NombreCompleto,
                IdEstrategiaEliminacion = pc.IdEstrategiaEliminacion,
                IdUsrCreacion = pc.IdUsrCreacion,
                IdUsrModificacion = pc.IdUsrModificacion,
                Estado = pc.Estado,
                MetodoEmbalaje = pc.MetodoEmbalaje,
                PathPadre = pc.PathPadre,
                FechaCreacion = pc.FechaCreacion,
                FechaModificacion = pc.FechaModificacion,
            };
        }
        public static IQueryable<ProdCategoria> Includes(this IQueryable<ProdCategoria> query)
        {
            return query;
        }
        public static IQueryable<ProdCategoriaRes> GetRes(this IQueryable<ProdCategoria> query)
        {
            return query.Includes().Select(entity => CreateRes(entity));
        }

        public static void ProdCategoriaEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Producto Categoria";
            string baseUrl = "/productoCategoria";

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var productoCategoria = await db.ProdCategoria.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.ProdCategoria.GET, productoCategoria);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var productoCategoria = await db.ProdCategoria.IgnoreQueryFilters().GetRes().ToListAsync();
                return res.SuccessResponse(Messages.ProdCategoria.GET, productoCategoria);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                return await db.ProdCategoria.Where(ca => ca.Id == id).GetRes().FirstOrDefaultAsync() is ProdCategoriaRes e
                    ? res.SuccessResponse(Messages.ProdCategoria.FIND, e)
                    : res.NotFoundResponse(Messages.ProdCategoria.NOTFOUND);
            }).RequireAuthorization().WithTags(tag);

            app.MapPost(baseUrl, async (ProdCategoriaDTO ca, DBContext db) =>
            {
                var exit = await db.ProdCategoria.AnyAsync(e => e.Nombre == ca.Nombre);
                if (exit) return res.BadRequestResponse(Messages.ProdCategoria.EXISTS);

                ProdCategoria categoria = new()
                {
                    Nombre = ca.Nombre,
                    IdPadre = ca.IdPadre,
                    NombreCompleto = ca.NombreCompleto,
                    IdEstrategiaEliminacion = ca.IdEstrategiaEliminacion,
                    MetodoEmbalaje = ca.MetodoEmbalaje,
                    PathPadre = ca.PathPadre,
                };
                db.ProdCategoria.Add(categoria);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.ProdCategoria.CREATED, CreateRes(categoria));
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/{id}", async (int id, ProdCategoriaDTO ca, DBContext db) =>
            {
                var exit = await db.ProdCategoria.AnyAsync(e => e.Nombre == ca.Nombre && e.Id != id);
                if (exit) return res.BadRequestResponse(Messages.ProdCategoria.EXISTS);
                var categoria = await db.ProdCategoria.Includes().FirstOrDefaultAsync(pc => pc.Id == id);
                if (categoria is null) return res.NotFoundResponse(Messages.ProdCategoria.NOTFOUND);
                categoria.Nombre = ca.Nombre;
                categoria.IdPadre = ca.IdPadre;
                categoria.NombreCompleto = ca.NombreCompleto;
                categoria.IdEstrategiaEliminacion = ca.IdEstrategiaEliminacion;
                categoria.MetodoEmbalaje = ca.MetodoEmbalaje;
                categoria.PathPadre = ca.PathPadre;
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.ProdCategoria.UPDATED, CreateRes(categoria));
            }).RequireAuthorization().WithTags(tag);

            app.MapDelete(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                var categoria = await db.ProdCategoria.FindAsync(id);
                if (categoria is null) return res.NotFoundResponse(Messages.ProdCategoria.NOTFOUND);
                db.ProdCategoria.Remove(categoria);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.ProdCategoria.DELETED, "");
            }).RequireAuthorization().WithTags(tag);
        }
    }
}