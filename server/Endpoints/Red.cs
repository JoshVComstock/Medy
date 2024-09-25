using server.Data;
using server.Models;
using server.Responses;
using server.Utils;
using server.Dtos;
using Microsoft.EntityFrameworkCore;
using server.Constants;

namespace server.Endpoints
{
    public static class RedExt
    {
        public static RedRes CreateRedRes(Red c)
        {
            return new RedRes
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
        public static IQueryable<Red> Includes(this IQueryable<Red> query)
        {
            return query;
        }
        public static IQueryable<RedRes> GetRes(this IQueryable<Red> query)
        {
            return query.Includes().Select(entity => CreateRedRes(entity));
        }
        public static void RedEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Red";
            string baseUrl = "/red";

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var red = await db.Red.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.Red.GET, red);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var red = await db.Red.IgnoreQueryFilters().Select(pv => CreateRedRes(pv)).ToListAsync();
                return res.SuccessResponse(Messages.Red.GET, red);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                return await db.Red.Where(pv => pv.Id == id).Select(pv => CreateRedRes(pv)).FirstOrDefaultAsync() is RedRes e
                    ? res.SuccessResponse(Messages.Red.FIND, e)
                    : res.NotFoundResponse(Messages.Red.NOTFOUND);
            }).RequireAuthorization().WithTags(tag);


            app.MapPost(baseUrl, async (RedDTO C, DBContext db) =>
            {
                Red red = new()
                {
                    Nombre = C.Nombre,
                };
                db.Red.Add(red);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.Red.CREATED, CreateRedRes(red));
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/{id}", async (int id, RedDTO pv, DBContext db) =>
            {
                var red = await db.Red.FindAsync(id);
                if (red is null) return res.NotFoundResponse(Messages.Red.NOTFOUND);

                red.Nombre = pv.Nombre;
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.Red.UPDATED, CreateRedRes(red));
            }).RequireAuthorization().WithTags(tag);

            app.MapDelete(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                var red = await db.Red.FindAsync(id);
                if (red is null) return res.NotFoundResponse(Messages.Red.NOTFOUND);
                db.Red.Remove(red);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.Red.DELETED, "");
            }).RequireAuthorization().WithTags(tag);
        }
    }
}
