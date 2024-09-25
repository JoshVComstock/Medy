using server.Data;
using server.Models;
using server.Responses;
using server.Utils;
using server.Dtos;
using Microsoft.EntityFrameworkCore;
using server.Constants;

namespace server.Endpoints
{
    public static class RiModeloExt
    {
        public static RiModeloRes CreateRes(RiModelo rm)
        {
            return new RiModeloRes
            {
                Id = rm.Id,
                Modelo = rm.Modelo,
                Secuencia = rm.Secuencia,
                Estado = rm.Estado,
                Descripcion = rm.Descripcion,
                Tipo = rm.Tipo,
                IdMenu = rm.IdMenu,
                NombreMenu = rm.Menu.Nombre,
                IdUsrCreacion = rm.IdUsrModificacion,
                IdUsrModificacion = rm.IdUsrModificacion,
                FechaCreacion = rm.FechaCreacion,
                FechaModificacion = rm.FechaModificacion,
            };
        }
        public static IQueryable<RiModelo> Includes(this IQueryable<RiModelo> query)
        {
            return query.Include(rm => rm.Menu);
        }
        public static IQueryable<RiModeloRes> GetRes(this IQueryable<RiModelo> query)
        {
            return query.Includes().Select(entity => CreateRes(entity));
        }

        public static void RiModeloEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Modelo";
            string baseUrl = "/riModelo";

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var Modelo = await db.RiModelo.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.RiModelo.GET, Modelo);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var Modelo = await db.RiModelo.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.RiModelo.GET, Modelo);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                return await db.RiModelo.Where(ca => ca.Id == id).GetRes().FirstOrDefaultAsync() is RiModeloRes e
                    ? res.SuccessResponse(Messages.RiModelo.FIND, e)
                    : res.NotFoundResponse(Messages.RiModelo.NOTFOUND);
            }).RequireAuthorization().WithTags(tag);

            app.MapPost(baseUrl, async (RiModeloDTO ca, DBContext db) =>
            {
                var exit = await db.RiModelo.AnyAsync(e => e.Modelo == ca.Modelo);
                if (exit) return res.BadRequestResponse(Messages.RiModelo.EXISTS);
                var cc = await db.RiMenu.FindAsync(ca.IdMenu);
                if (cc is null) return res.NotFoundResponse(Messages.ContableDetalleAsiento.NOTCUENTA);
                RiModelo modelo = new()
                {
                    Modelo = ca.Modelo,
                    Secuencia = ca.Secuencia,
                    Descripcion = ca.Descripcion,
                    Tipo = ca.Tipo,
                    Menu = cc,
                };
                db.RiModelo.Add(modelo);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.RiModelo.CREATED, CreateRes(modelo));
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/{id}", async (int id, RiModeloDTO ca, DBContext db) =>
            {
                var exit = await db.RiModelo.AnyAsync(e => e.Modelo == ca.Modelo && e.Id != id);
                if (exit) return res.BadRequestResponse(Messages.RiModelo.EXISTS);
                var modelo = await db.RiModelo.Includes().FirstOrDefaultAsync(rm => rm.Id == id);
                if (modelo is null) return res.NotFoundResponse(Messages.RiModelo.NOTFOUND);
                modelo.Modelo = ca.Modelo;
                modelo.Tipo = ca.Tipo;
                modelo.Descripcion = ca.Descripcion;
                modelo.Secuencia = ca.Secuencia;
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.RiModelo.UPDATED, CreateRes(modelo));
            }).RequireAuthorization().WithTags(tag);

            app.MapDelete(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                var modelo = await db.RiModelo.Include(m => m.RiAccesoModelo).FirstOrDefaultAsync(m => m.Id == id);
                if (modelo is null) return res.NotFoundResponse(Messages.RiModelo.NOTFOUND);
                db.RiModelo.Remove(modelo);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.RiModelo.DELETED, "");
            }).RequireAuthorization().WithTags(tag);
        }
    }
}