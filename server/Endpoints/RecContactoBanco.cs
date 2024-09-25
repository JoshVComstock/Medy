using server.Utils;
using server.Dtos;
using Microsoft.EntityFrameworkCore;
using server.Constants;
using server.Data;
using server.Responses;
using server.Models;
using System.Security.Cryptography.Pkcs;

namespace server.Endpoints
{
    public static class RecContactoBancoExt
    {
        public static RecContactoBancoRes CreateRes(RecContactoBanco rb)
        {
            return new RecContactoBancoRes
            {
                Id = rb.Id,
                Empresa = RecEmpresaExt.CreateEmpresaInfoRes(rb.Empresa),
                Banco =  RecBancoExt.CreateRes(rb.Banco),
                Contacto =  RecContactoExt.CreateRes(rb.Contacto) ,
                NumeroCuenta = rb.NumeroCuenta,
                Estado = rb.Estado,
                FechaCreacion = rb.FechaCreacion,
                FechaModificacion = rb.FechaModificacion,
                IdUsrCreacion = rb.IdUsrCreacion,
                IdUsrModificacion = rb.IdUsrModificacion,
                Moneda =  RecMonedaExt.CreateMonedaRes(rb.Moneda) 

            };
        }

        public static IQueryable<RecContactoBanco> Includes(this IQueryable<RecContactoBanco> query)
        {
            return query
            .Include(e => e.Empresa)
            .Include(b => b.Banco)
            .Include(c => c.Contacto)
            .Include(m => m.Moneda);
        }
        public static IQueryable<RecContactoBancoRes> GetRes(this IQueryable<RecContactoBanco> query)
        {
            return query.Includes().Select(entity => CreateRes(entity));
        }

        public static void RecContactoBancoEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Contacto Banco";
            string baseUrl = "/RecContactoBanco";

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var Banco = await db.RecContactoBanco.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.RecContactoBanco.GET, Banco);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var Banco = await db.RecContactoBanco.IgnoreQueryFilters().GetRes().ToListAsync();
                return res.SuccessResponse(Messages.RecContactoBanco.GET, Banco);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                return await db.RecContactoBanco.Where(ca => ca.Id == id).GetRes().FirstOrDefaultAsync() is RecContactoBancoRes e
                    ? res.SuccessResponse(Messages.RecContactoBanco.FIND, e)
                    : res.NotFoundResponse(Messages.RecContactoBanco.NOTFOUND);
            }).RequireAuthorization().WithTags(tag);

            app.MapPost(baseUrl, async (RecContactoBancoDTO rb, DBContext db) =>
           {
               var c = await db.RecContacto.FindAsync(rb.IdContacto);
               if (c is null) return res.NotFoundResponse(Messages.RecContactoBanco.NOTCONTACTO);
               var cm = await db.RecBanco.FindAsync(rb.IdBanco);
               if (cm is null) return res.NotFoundResponse(Messages.RecContactoBanco.NOTBANCO);
               var em = await db.RecEmpresa.FindAsync(rb.IdEmpresa);
               if (em is null) return res.NotFoundResponse(Messages.RecEmpresa.NOTFOUND);
               var m = await db.RecMoneda.FindAsync(rb.IdMoneda);
               if (m is null) return res.NotFoundResponse(Messages.Moneda.NOTFOUND);
               RecContactoBanco banco = new()
               {
                   Banco = cm,
                   Contacto = c,
                   Moneda = m,
                   NumeroCuenta = rb.NumeroCuenta,
                   Empresa = em

               };
               db.RecContactoBanco.Add(banco);
               await db.SaveChangesAsync();

               return res.SuccessResponse(Messages.RecContactoBanco.CREATED, CreateRes(banco));
           }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/{id}", async (int id, RecContactoBancoDTO ca, DBContext db) =>
            {
                var c = await db.RecContacto.FindAsync(ca.IdContacto);
                if (c is null) return res.NotFoundResponse(Messages.RecContactoBanco.NOTCONTACTO);
                var cm = await db.RecBanco.FindAsync(ca.IdBanco);
                if (cm is null) return res.NotFoundResponse(Messages.RecContactoBanco.NOTBANCO);
                var banco = await db.RecContactoBanco.Includes().FirstOrDefaultAsync(c => c.Id == id);
                if (banco is null) return res.NotFoundResponse(Messages.RecContactoBanco.NOTFOUND);
                var em = await db.RecEmpresa.FindAsync(ca.IdEmpresa);
                if (em is null) return res.NotFoundResponse(Messages.RecEmpresa.NOTFOUND);
                var m = await db.RecMoneda.FindAsync(ca.IdMoneda);
                if (m is null) return res.NotFoundResponse(Messages.Moneda.NOTFOUND);
                banco.NumeroCuenta = ca.NumeroCuenta;
                banco.Banco = cm;
                banco.Contacto = c;
                banco.Empresa = em;
                banco.Moneda = m;
                db.RecContactoBanco.Update(banco);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.RecContactoBanco.UPDATED, CreateRes(banco));
            }).RequireAuthorization().WithTags(tag);

            app.MapDelete(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                var banco = await db.RecContactoBanco.FirstOrDefaultAsync(c => c.Id == id);
                if (banco is null) return res.NotFoundResponse(Messages.RecContactoBanco.NOTFOUND);
                db.RecContactoBanco.Remove(banco);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.RecContactoBanco.DELETED, "");
            }).RequireAuthorization().WithTags(tag);
        }
    }
}