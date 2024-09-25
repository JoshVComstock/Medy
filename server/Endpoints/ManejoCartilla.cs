using server.Data;
using server.Models;
using server.Responses;
using server.Utils;
using server.Dtos;
using Microsoft.EntityFrameworkCore;
using server.Constants;

namespace server.Endpoints
{
    public static class ManejoCartillaExt
    {
        public static ManejoCartillaRes CreateManejoCartillaRes(ManejoCartilla man)
        {
            return new ManejoCartillaRes
            {
                Id = man.Id,
                CantidadEntrega = man.CantidadEntrega,
                CantidadRecivida = man.CantidadRecivida,
                Centro = man.Centro.Nombre,
                CodigoTarjetaFinal = man.CodigoTarjetaFinal,
                CodigoTarjetaInicio = man.CodigoTarjetaInicio,
                EntregadoPor = man.EntregadoPor,
                RecibidoPor = man.RecibidoPor,
                TipoManejo = man.TipoManejo,
                IdCentro = man.IdCentro,
                Telefono = man.Telefono,
                IdUsrCreacion = man.IdUsrCreacion,
                IdUsrModificacion = man.IdUsrModificacion,
                Estado = man.Estado,
                FechaCreacion = man.FechaCreacion,
                FechaModificacion = man.FechaModificacion
            };
        }
        public static IQueryable<ManejoCartilla> Includes(this IQueryable<ManejoCartilla> query)
        {
            return query
            .Include(m => m.Centro);
        }
        public static IQueryable<ManejoCartillaRes> GetRes(this IQueryable<ManejoCartilla> query)
        {
            return query.Includes().Select(entity => CreateManejoCartillaRes(entity));
        }
        public static void ManejoCartillaEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "ManejoCartilla";
            string baseUrl = "/manejoCartilla";

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var ManejoCartilla = await db.ManejoCartilla.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.ManejoCartilla.GET, ManejoCartilla);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/hospital", async (DBContext db) =>
              {
                  var ManejoCartilla = await db.ManejoCartilla.Where(x => x.TipoManejo == "Hospital").GetRes().ToListAsync();
                  return res.SuccessResponse(Messages.ManejoCartilla.GET, ManejoCartilla);
              }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/provincia", async (DBContext db) =>
            {
                var ManejoCartilla = await db.ManejoCartilla.Where(x => x.TipoManejo == "Provincia").GetRes().ToListAsync();
                return res.SuccessResponse(Messages.ManejoCartilla.GET, ManejoCartilla);
            }).RequireAuthorization().WithTags(tag);
            app.MapGet(baseUrl + "/faltantes", async (DBContext db) =>
             {
                 var ManejoCartilla = await db.ManejoCartilla.Where(x => x.CantidadRecivida == 0).GetRes().ToListAsync();
                 return res.SuccessResponse(Messages.ManejoCartilla.GET, ManejoCartilla);
             }).RequireAuthorization().WithTags(tag);
            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var manoratorio = await db.ManejoCartilla.IgnoreQueryFilters().Select(man => CreateManejoCartillaRes(man)).ToListAsync();
                return res.SuccessResponse(Messages.ManejoCartilla.GET, manoratorio);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                return await db.ManejoCartilla.Where(man => man.Id == id).Select(man => CreateManejoCartillaRes(man)).FirstOrDefaultAsync() is ManejoCartillaRes e
                    ? res.SuccessResponse(Messages.ManejoCartilla.FIND, e)
                    : res.NotFoundResponse(Messages.ManejoCartilla.NOTFOUND);
            }).RequireAuthorization().WithTags(tag);

            app.MapPost(baseUrl, async (ManejoCartillaDTO man, DBContext db) =>
            {

                var centro = await db.Centro.FindAsync(man.IdCentro);
                if (centro is null) return res.NotFoundResponse(Messages.Centro.NOTFOUND);
                ManejoCartilla manejoCartilla = new()
                {
                    CantidadEntrega = man.CantidadEntrega,
                    CantidadRecivida = man.CantidadRecivida ?? 0,
                    Centro = centro,
                    CodigoTarjetaFinal = man.CodigoTarjetaFinal,
                    CodigoTarjetaInicio = man.CodigoTarjetaInicio,
                    EntregadoPor = man.EntregadoPor,
                    RecibidoPor = man.RecibidoPor,
                    TipoManejo = man.TipoManejo,
                    Telefono = man.Telefono,
                };
                db.ManejoCartilla.Add(manejoCartilla);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.ManejoCartilla.CREATED, CreateManejoCartillaRes(manejoCartilla));
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/{id}", async (int id, ManejoCartillaDTO man, DBContext db) =>
            {
                var manejoCar = await db.ManejoCartilla.FindAsync(id);
                if (manejoCar is null) return res.NotFoundResponse(Messages.ManejoCartilla.NOTFOUND);
                var centro = await db.Centro.FindAsync(man.IdCentro);
                if (centro is null) return res.NotFoundResponse(Messages.Centro.NOTFOUND);
                manejoCar.Centro = centro;
                manejoCar.TipoManejo = man.TipoManejo;
                manejoCar.CantidadEntrega = man.CantidadEntrega;
                manejoCar.CantidadRecivida = man.CantidadRecivida;
                manejoCar.CodigoTarjetaFinal = man.CodigoTarjetaFinal;
                manejoCar.CodigoTarjetaInicio = man.CodigoTarjetaInicio;
                manejoCar.EntregadoPor = man.EntregadoPor;
                manejoCar.RecibidoPor = man.RecibidoPor;
                manejoCar.Telefono = man.Telefono;
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.ManejoCartilla.UPDATED, CreateManejoCartillaRes(manejoCar));
            }).RequireAuthorization().WithTags(tag);

            app.MapDelete(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                var manejoCartilla = await db.ManejoCartilla.FindAsync(id);
                if (manejoCartilla is null) return res.NotFoundResponse(Messages.ManejoCartilla.NOTFOUND);
                db.ManejoCartilla.Remove(manejoCartilla);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.ManejoCartilla.DELETED, "");
            }).RequireAuthorization().WithTags(tag);
        }
    }
}
