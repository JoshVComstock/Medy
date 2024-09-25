using server.Data;
using server.Models;
using server.Responses;
using server.Utils;
using server.Dtos;
using Microsoft.EntityFrameworkCore;
using server.Constants;

namespace server.Endpoints
{
    public static class RiCategoriaModuloExt
    {
        public static RiCategoriaModuloRes CreateRes(RiCategoriaModulo rcm)
        {
            return new RiCategoriaModuloRes
            {
                Id = rcm.Id,
                Nombre = rcm.Nombre,
                Descripcion = rcm.Descripcion,
                IdUsrCreacion = rcm.IdUsrCreacion,
                IdUsrModificacion = rcm.IdUsrModificacion,
                IdPadre = rcm.IdPadre,
                Secuencia = rcm.Secuencia,
                Exclusivo = rcm.Exclusivo,
                Visible = rcm.Visible,
                Estado = rcm.Estado,
                FechaCreacion = rcm.FechaCreacion,
                FechaModificacion = rcm.FechaModificacion
            };
        }
        public static IQueryable<RiCategoriaModulo> Includes(this IQueryable<RiCategoriaModulo> query)
        {
            return query;
        }
        public static IQueryable<RiCategoriaModuloRes> GetRes(this IQueryable<RiCategoriaModulo> query)
        {
            return query.Includes().Select(entity => CreateRes(entity));
        }

        public static void RiCategoriaModuloEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Ri Categoria Modulo";
            string baseUrl = "/riCategoriaModulo";

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var CategoriaModulo = await db.RiCategoriaModulo.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.RiCategoriaModulo.GET, CategoriaModulo);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var CategoriaModulo = await db.RiCategoriaModulo.IgnoreQueryFilters().GetRes().ToListAsync();
                return res.SuccessResponse(Messages.RiCategoriaModulo.GET, CategoriaModulo);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                return await db.RiCategoriaModulo.Where(ca => ca.Id == id).GetRes().FirstOrDefaultAsync() is RiCategoriaModuloRes e
                    ? res.SuccessResponse(Messages.RiCategoriaModulo.FIND, e)
                    : res.NotFoundResponse(Messages.RiCategoriaModulo.NOTFOUND);
            }).RequireAuthorization().WithTags(tag);

            app.MapPost(baseUrl, async (RiCategoriaModuloDTO ca, DBContext db) =>
            {
                var fecha = DateTime.UtcNow;
                var exit = await db.RiCategoriaModulo.AnyAsync(e => e.Nombre == ca.Nombre);
                if (exit) return res.BadRequestResponse(Messages.RiCategoriaModulo.EXISTS);

                RiCategoriaModulo modulo = new()
                {
                    Nombre = ca.Nombre,
                    IdPadre = ca.IdPadre,
                    Descripcion = ca.Descripcion,
                    Exclusivo = ca.Exclusivo,
                    Secuencia = ca.Secuencia,
                    Visible = ca.Visible
                };
                db.RiCategoriaModulo.Add(modulo);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.RiCategoriaModulo.CREATED, CreateRes(modulo));
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/{id}", async (int id, RiCategoriaModuloDTO ca, DBContext db) =>
            {
                var exit = await db.RiCategoriaModulo.AnyAsync(e => e.Nombre == ca.Nombre && e.Id != id);
                if (exit) return res.BadRequestResponse(Messages.RiCategoriaModulo.EXISTS);
                var modulo = await db.RiCategoriaModulo.Includes().FirstOrDefaultAsync(rcm => rcm.Id == id);
                if (modulo is null) return res.NotFoundResponse(Messages.RiCategoriaModulo.NOTFOUND);
                modulo.Nombre = ca.Nombre;
                modulo.IdPadre = ca.IdPadre;
                modulo.Descripcion = ca.Descripcion;
                modulo.Exclusivo = ca.Exclusivo;
                modulo.Secuencia = ca.Secuencia;
                modulo.Visible = ca.Visible;
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.RiCategoriaModulo.UPDATED, CreateRes(modulo));
            }).RequireAuthorization().WithTags(tag);

            app.MapDelete(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                var modulo = await db.RiCategoriaModulo.FindAsync(id);
                if (modulo is null) return res.NotFoundResponse(Messages.RiCategoriaModulo.NOTFOUND);
                db.RiCategoriaModulo.Remove(modulo);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.RiCategoriaModulo.DELETED, "");
            }).RequireAuthorization().WithTags(tag);
        }
    }
}
