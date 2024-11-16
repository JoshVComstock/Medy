using server.Data;
using server.Models;
using server.Responses;
using server.Utils;
using server.Dtos;
using Microsoft.EntityFrameworkCore;
using server.Constants;

namespace server.Endpoints
{
    public static class PvConfigExt
    {
        public static PvConfigRes CreateRes(PvConfig pc)
        {
            return new PvConfigRes
            {
                Id = pc.Id,
                IdUsrCreacion = pc.IdUsrCreacion,
                IdUsrModificacion = pc.IdUsrModificacion,
                Estado = pc.Estado,
                FechaCreacion = pc.FechaCreacion,
                FechaModificacion = pc.FechaModificacion,
                Nombre = pc.Nombre,
                IdTipoTerminal = pc.IdTipoTerminal,
                LimiteContactos = pc.LimiteContactos,
                LimiteProducto = pc.LimiteProducto
            };
        }
        public static IQueryable<PvConfig> Includes(this IQueryable<PvConfig> query)
        {
            return query;
        }
        public static IQueryable<PvConfigRes> GetRes(this IQueryable<PvConfig> query)
        {
            return query.Includes().Select(entity => CreateRes(entity));
        }

        public static void PvConfigEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Config";
            string baseUrl = "/pvConfig";

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var productoCategoria = await db.PvConfig.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.PvConfig.GET, productoCategoria);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var productoCategoria = await db.PvConfig.IgnoreQueryFilters().GetRes().ToListAsync();
                return res.SuccessResponse(Messages.PvConfig.GET, productoCategoria);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                return await db.PvConfig.Where(ca => ca.Id == id).GetRes().FirstOrDefaultAsync() is PvConfigRes e
                    ? res.SuccessResponse(Messages.PvConfig.FIND, e)
                    : res.NotFoundResponse(Messages.PvConfig.NOTFOUND);
            }).RequireAuthorization().WithTags(tag);

            app.MapPost(baseUrl, async (PvConfigDTO ca, DBContext db) =>
            {
             
                PvConfig Config = new()
                {
                    Nombre = ca.Nombre,
                    IdTipoTerminal = ca.IdTipoTerminal,
                    LimiteContactos = ca.LimiteContactos,
                    LimiteProducto = ca.LimiteProducto,
                  
                };
                db.PvConfig.Add(Config);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.PvConfig.CREATED, CreateRes(Config));
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/{id}", async (int id, PvConfigDTO ca, DBContext db) =>
            {
                var Config = await db.PvConfig.Includes().FirstOrDefaultAsync(pc => pc.Id == id);
                if (Config is null) return res.NotFoundResponse(Messages.PvConfig.NOTFOUND);
                Config.IdTipoTerminal = ca.IdTipoTerminal;
                Config.LimiteContactos = ca.LimiteContactos;
                Config.LimiteProducto = ca.LimiteProducto;
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.PvConfig.UPDATED, CreateRes(Config));
            }).RequireAuthorization().WithTags(tag);

            app.MapDelete(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                var Config = await db.PvConfig.FindAsync(id);
                if (Config is null) return res.NotFoundResponse(Messages.PvConfig.NOTFOUND);
                db.PvConfig.Remove(Config);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.PvConfig.DELETED, "");
            }).RequireAuthorization().WithTags(tag);
        }
    }
}