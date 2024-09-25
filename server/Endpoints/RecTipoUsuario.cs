using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Responses;
using server.Utils;
using server.Dtos;
using server.Constants;

namespace server.Endpoints
{
    public static class TipoUsuarioExt
    {
        public static RecTipoUsuarioRes CreateRes(RecTipoUsuario rtu)
        {
            return new RecTipoUsuarioRes
            {
                Id = rtu.Id,
                Estado = rtu.Estado,
                Descripcion = rtu.Descripcion,
                IdUsrCreacion = rtu.IdUsrCreacion,
                IdUsrModificacion = rtu.IdUsrModificacion,
                FechaCreacion = rtu.FechaCreacion,
                FechaModificacion = rtu.FechaModificacion,
            };
        }
        public static IQueryable<RecTipoUsuario> Includes(this IQueryable<RecTipoUsuario> query)
        {
            return query;
        }
        public static IQueryable<RecTipoUsuarioRes> GetRes(this IQueryable<RecTipoUsuario> query)
        {
            return query.Includes().Select(entity => CreateRes(entity));
        }

        public static void RecTipoUsuarioEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Tipo usuario";
            string baseUrl = "/recTipoUsuario";

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var tipoUsuario = await db.RecTipoUsuario.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.RecTipoUsuario.GET, tipoUsuario);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var tipoUsuario = await db.RecTipoUsuario.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.RecTipoUsuario.GET, tipoUsuario);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id:int}", async (int id, DBContext db) =>
            {
                return await db.RecTipoUsuario.Where(ctc => ctc.Id == id).GetRes().FirstOrDefaultAsync() is RecTipoUsuarioRes e
                    ? res.SuccessResponse(Messages.RecTipoUsuario.FIND, e)
                    : res.NotFoundResponse(Messages.RecTipoUsuario.NOTFOUND);
            }).RequireAuthorization().WithTags(tag);

            app.MapPost(baseUrl, async (RecTipoUsuarioDTO ctc, DBContext db) =>
            {
                RecTipoUsuario tipoUsuario = new()
                {
                    Descripcion = ctc.Descripcion
                };
                db.RecTipoUsuario.Add(tipoUsuario);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.RecTipoUsuario.CREATED, CreateRes(tipoUsuario));
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/{id:int}", async (int id, RecTipoUsuarioDTO ctc, DBContext db) =>
            {
                var tipoUsuario = await db.RecTipoUsuario.Includes().FirstOrDefaultAsync(rtu => rtu.Id == id);
                if (tipoUsuario is null) return res.NotFoundResponse(Messages.RecTipoUsuario.NOTFOUND);
                tipoUsuario.Descripcion = ctc.Descripcion;
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.RecTipoUsuario.UPDATED, CreateRes(tipoUsuario));
            }).RequireAuthorization().WithTags(tag);

            app.MapDelete(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                var tipoUsuario = await db.RecTipoUsuario.FindAsync(id);
                if (tipoUsuario is null) return res.NotFoundResponse(Messages.RecTipoUsuario.NOTFOUND);
                db.RecTipoUsuario.Remove(tipoUsuario);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.RecTipoUsuario.DELETED, "");
            }).RequireAuthorization().WithTags(tag);
        }
    }
}