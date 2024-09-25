using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Responses;
using server.Dtos;
using server.Utils;
using server.Constants;

namespace server.Endpoints
{
    public static class ContableBancoExt
    {
        public static BancoRes CreateRes(ContableBanco cc)
        {
            return new BancoRes
            {
                
                Id = cc.Id,
                IdCuenta = cc.IdCuenta,
                Nombre = cc.Nombre,
                NumeroCuenta = cc.NumeroCuenta,
                Estado = cc.Estado,
                FechaCreacion = cc.FechaCreacion,
                FechaModificacion = cc.FechaModificacion,
                IdUsrCreacion = cc.IdUsrCreacion,
                IdUsrModificacion = cc.IdUsrModificacion,
            };
        }
        public static IQueryable<ContableBanco> Includes(this IQueryable<ContableBanco> query)
        {
            return query;
        }
        public static IQueryable<BancoRes> GetRes(this IQueryable<ContableBanco> query)
        {
            return query.Includes().Select(entity => CreateRes(entity));
        }

        public static void ContableBancoEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Contable Banco";
            string baseUrl = "/contableBanco";

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var accounts = await db.ContableBanco.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.ContableBanco.GET, accounts);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var accounts = await db.ContableBanco.IgnoreQueryFilters().GetRes().ToListAsync();
                return res.SuccessResponse(Messages.ContableBanco.GET, accounts);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id:int}", async (int id, DBContext db) =>
            {
                return await db.ContableBanco.Where(cc => cc.Id == id).GetRes().FirstOrDefaultAsync() is BancoRes e
                    ? res.SuccessResponse(Messages.ContableBanco.FIND, e)
                    : res.NotFoundResponse(Messages.ContableBanco.NOTFOUND);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/getByCuenta/{idCuenta:int}", async (int idCuenta, DBContext db) =>
            {
                var bancos = await db.ContableBanco.Where(cda => cda.IdCuenta == idCuenta).GetRes().ToListAsync();
                return res.SuccessResponse(Messages.ContableBanco.GET, bancos);
            }).RequireAuthorization().WithTags(tag);

            app.MapPost(baseUrl, async (BancoDTO aa, DBContext db) =>
            {
               
                ContableBanco banco = new()
                {
                    Nombre = aa.Nombre,
                    NumeroCuenta = aa.NumeroCuenta
                };
                db.ContableBanco.Add(banco);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.ContableBanco.CREATED, CreateRes(banco));
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/{id:int}", async (int id, BancoDTO aa, DBContext db) =>
            {
                var banco = await db.ContableBanco.Includes().FirstOrDefaultAsync(cc => cc.Id == id);
                if (banco is null) return res.NotFoundResponse(Messages.ContableBanco.NOTFOUND);
       
                banco.Nombre = aa.Nombre;
                banco.NumeroCuenta = aa.NumeroCuenta;
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.ContableBanco.UPDATED, CreateRes(banco));
            }).RequireAuthorization().WithTags(tag);

            app.MapDelete(baseUrl + "/{id:int}", async (int id, DBContext db) =>
            {
                var banco = await db.ContableBanco.Where(cc => cc.Id == id).FirstOrDefaultAsync();
                if (banco is null) return res.NotFoundResponse(Messages.ContableBanco.NOTFOUND);
                db.ContableBanco.Remove(banco);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.ContableBanco.DELETED, "");
            }).RequireAuthorization().WithTags(tag);
        }
    }
}