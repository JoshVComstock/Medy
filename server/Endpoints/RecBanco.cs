using server.Utils;
using server.Dtos;
using Microsoft.EntityFrameworkCore;
using server.Constants;
using server.Data;
using server.Responses;
using server.Models;

namespace server.Endpoints
{
    public static class RecBancoExt
    {
        public static RecBancoRes CreateRes(RecBanco rb)
        {
            return new RecBancoRes
            {
                Id = rb.Id,
                Ciudad = rb.Ciudad,
                CodigoPostal = rb.CodigoPostal,
                Direccion = rb.Direccion,
                Direccion2 = rb.Direccion2,
                Email = rb.Email,
                Estado = rb.Estado,
                FechaCreacion = rb.FechaCreacion,
                FechaModificacion = rb.FechaModificacion,
                IdUsrCreacion = rb.IdUsrCreacion,
                IdUsrModificacion = rb.IdUsrModificacion,
                Nombre = rb.Nombre,
                Telefono = rb.Telefono,
            };
        }

        public static IQueryable<RecBanco> Includes(this IQueryable<RecBanco> query)
        {
            return query;
        }
        public static IQueryable<RecBancoRes> GetRes(this IQueryable<RecBanco> query)
        {
            return query.Includes().Select(entity => CreateRes(entity));
        }

        public static void RecBancoEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Banco";
            string baseUrl = "/recBanco";

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var Banco = await db.RecBanco.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.RecBanco.GET, Banco);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var Banco = await db.RecBanco.IgnoreQueryFilters().GetRes().ToListAsync();
                return res.SuccessResponse(Messages.RecBanco.GET, Banco);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                return await db.RecBanco.Where(ca => ca.Id == id).GetRes().FirstOrDefaultAsync() is RecBancoRes e
                    ? res.SuccessResponse(Messages.RecBanco.FIND, e)
                    : res.NotFoundResponse(Messages.RecBanco.NOTFOUND);
            }).RequireAuthorization().WithTags(tag);

            app.MapPost(baseUrl, async (RecBancoDTO rb, DBContext db) =>
           {
               var exit = await db.RecBanco.AnyAsync(e => e.Nombre == rb.Nombre);
               if (exit) return res.BadRequestResponse(Messages.RecBanco.EXISTS);
               RecBanco banco = new()
               {
                   Ciudad = rb.Ciudad,
                   CodigoPostal = rb.CodigoPostal,
                   Direccion = rb.Direccion,
                   Direccion2 = rb.Direccion2,
                   Email = rb.Email,
                   Nombre = rb.Nombre,
                   Telefono = rb.Telefono
               };
               db.RecBanco.Add(banco);
               await db.SaveChangesAsync();

               return res.SuccessResponse(Messages.RecBanco.CREATED, CreateRes(banco));
           }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/{id}", async (int id, RecBancoDTO ca, DBContext db) =>
            {
                var exit = await db.RecBanco.AnyAsync(e => e.Nombre == ca.Nombre && e.Id != id);
                if (exit) return res.BadRequestResponse(Messages.RecBanco.EXISTS);
                var banco = await db.RecBanco.Includes().FirstOrDefaultAsync(c => c.Id == id);
                if (banco is null) return res.NotFoundResponse(Messages.RecBanco.NOTFOUND);
                banco.Ciudad = ca.Ciudad;
                banco.CodigoPostal = ca.CodigoPostal;
                banco.Direccion = ca.Direccion;
                banco.Direccion2 = ca.Direccion2;
                banco.Nombre = ca.Nombre;
                banco.Telefono = ca.Telefono;
                db.RecBanco.Update(banco);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.RecBanco.UPDATED, CreateRes(banco));
            }).RequireAuthorization().WithTags(tag);

            app.MapDelete(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                var banco = await db.RecBanco.FirstOrDefaultAsync(c => c.Id == id);
                if (banco is null) return res.NotFoundResponse(Messages.RecBanco.NOTFOUND);
                db.RecBanco.Remove(banco);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.RecBanco.DELETED, "");
            }).RequireAuthorization().WithTags(tag);
        }
    }
}