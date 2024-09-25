using server.Data;
using server.Models;
using server.Responses;
using server.Utils;
using server.Dtos;
using Microsoft.EntityFrameworkCore;
using server.Constants;

namespace server.Endpoints
{
    public static class RecContactoCategoriaExt
    {
        public static RecContactoCategoriaRes CreateRes(RecContactoCategoria rcc)
        {
            return new RecContactoCategoriaRes
            {
                Id = rcc.Id,
                Color = rcc.Color,
                FechaCreacion = rcc.FechaCreacion,
                FechaModificacion = rcc.FechaModificacion,
                IdPadre = rcc.IdPadre,
                IdUsrCreacion = rcc.IdUsrCreacion,
                IdUsrModificacion = rcc.IdUsrModificacion,
                Nombre = rcc.Nombre,
                PathPadre = rcc.PathPadre,
                Estado = rcc.Estado,
            };
        }
        public static IQueryable<RecContactoCategoria> Includes(this IQueryable<RecContactoCategoria> query)
        {
            return query;
        }
        public static IQueryable<RecContactoCategoriaRes> GetRes(this IQueryable<RecContactoCategoria> query)
        {
            return query.Includes().Select(entity => CreateRes(entity));
        }

        public static void RecContactoCategoriaEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Categoria Contacto";
            string baseUrl = "/recContactoCategoria";

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var ContactoCategoria = await db.RecContactoCategoria.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.RecContactoCategoria.GET, ContactoCategoria);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var ContactoCategoria = await db.RecContactoCategoria.IgnoreQueryFilters().GetRes().ToListAsync();
                return res.SuccessResponse(Messages.RecContactoCategoria.GET, ContactoCategoria);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                return await db.RecContactoCategoria.Where(ca => ca.Id == id).GetRes().FirstOrDefaultAsync() is RecContactoCategoriaRes e
                    ? res.SuccessResponse(Messages.RecContactoCategoria.FIND, e)
                    : res.NotFoundResponse(Messages.RecContactoCategoria.NOTFOUND);
            }).RequireAuthorization().WithTags(tag);

            app.MapPost(baseUrl, async (RecContactoCategoriaDTO ca, DBContext db) =>
            {
          
                var exit = await db.RecContactoCategoria.AnyAsync(e => e.Nombre == ca.Nombre);
                if (exit) return res.BadRequestResponse(Messages.RecContactoCategoria.EXISTS);

                RecContactoCategoria categoria = new()
                {
                    Nombre = ca.Nombre,
                    IdPadre = ca.IdPadre,
                    PathPadre = ca.PathPadre,
                    Color = ca.Color,

                };
                db.RecContactoCategoria.Add(categoria);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.RecContactoCategoria.CREATED, CreateRes(categoria));
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/{id}", async (int id, RecContactoCategoriaDTO ca, DBContext db) =>
            {
                var exit = await db.RecContactoCategoria.AnyAsync(e => e.Nombre == ca.Nombre && e.Id != id);
                if (exit) return res.BadRequestResponse(Messages.RecContactoCategoria.EXISTS);
                var categoria = await db.RecContactoCategoria.Includes().FirstOrDefaultAsync(rcc => rcc.Id == id);
                if (categoria is null) return res.NotFoundResponse(Messages.RecContactoCategoria.NOTFOUND);
                categoria.Nombre = ca.Nombre;
                categoria.IdPadre = ca.IdPadre;
                categoria.FechaModificacion = DateTime.UtcNow;
                categoria.PathPadre = ca.PathPadre;
                categoria.Color = ca.Color;
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.RecContactoCategoria.UPDATED, CreateRes(categoria));
            }).RequireAuthorization().WithTags(tag);

            app.MapDelete(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                var categoria = await db.RecContactoCategoria.Include(c => c.ContactoCategoriaRel).FirstOrDefaultAsync(c => c.Id == id);
                if (categoria is null) return res.NotFoundResponse(Messages.RecContactoCategoria.NOTFOUND);
                db.RecContactoCategoria.Remove(categoria);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.RecContactoCategoria.DELETED, "");
            }).RequireAuthorization().WithTags(tag);
        }
    }
}