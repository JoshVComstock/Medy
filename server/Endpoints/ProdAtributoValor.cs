using server.Data;
using server.Models;
using server.Responses;
using server.Utils;
using server.Dtos;
using Microsoft.EntityFrameworkCore;
using server.Constants;
namespace server.Endpoints
{
    public static class ProdAtributoValorExt
    {
        public static ProdAtributoValorRes CreateRes(ProdAtributoValor pav)
        {
            return new ProdAtributoValorRes
            {
                Id = pav.Id,
                Atributo = ProdAtributoExt.CreateProdAtributoRes(pav.Atributo),
                Nombre = pav.Nombre,
                Secuencia = pav.Secuencia,
                Color = pav.Color,
                ColorHtml = pav.ColorHtml,
                Personalizable = pav.Personalizable,
                FechaCreacion = pav.FechaCreacion,
                FechaModificacion = pav.FechaModificacion,
                IdUsrCreacion = pav.IdUsrCreacion,
                IdUsrModificacion = pav.IdUsrModificacion,
                Estado = pav.Estado
            };
        }
        public static IQueryable<ProdAtributoValor> Includes(this IQueryable<ProdAtributoValor> query)
        {
            return query.Include(a => a.Atributo);
        }
        public static IQueryable<ProdAtributoValorRes> GetRes(this IQueryable<ProdAtributoValor> query)
        {
            return query.Includes().Select(entity => CreateRes(entity));
        }
        public static void ProdAtributoValorEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Producto Atributo Valor";
            string baseUrl = "/productoAtributoValor";

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var productoAtributoValor = await db.ProdAtributoValor.Select(pav => CreateRes(pav)).ToListAsync();
                return res.SuccessResponse(Messages.ProdAtributoValor.GET, productoAtributoValor);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var productoAtributoValor = await db.ProdAtributoValor.IgnoreQueryFilters().Select(pav => CreateRes(pav)).ToListAsync();
                return res.SuccessResponse(Messages.ProdAtributoValor.GET, productoAtributoValor);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                return await db.ProdAtributoValor.Where(pav => pav.Id == id).Select(pav => CreateRes(pav)).FirstOrDefaultAsync() is ProdAtributoValorRes e
                    ? res.SuccessResponse(Messages.ProdAtributoValor.FIND, e)
                    : res.NotFoundResponse(Messages.ProdAtributoValor.NOTFOUND);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/getByAtributo/{idAtributo:int}", async (int idAtributo, DBContext db) =>
                     {
                         var atributos = await db.ProdAtributoValor.Where(cda => cda.IdAtributo == idAtributo).GetRes().ToListAsync();
                         return res.SuccessResponse(Messages.ProdAtributoValor.GET, atributos);
                     }).RequireAuthorization().WithTags(tag);

            app.MapPost(baseUrl, async (ProdAtributoValorDTO pav, DBContext db) =>
            {
                var exit = await db.ProdAtributoValor.AnyAsync(e => e.Nombre == pav.Nombre);
                if (exit) return res.BadRequestResponse(Messages.ProdAtributoValor.EXISTS);
                var atr = await db.ProdAtributo.FindAsync(pav.IdAtributo);
                if (atr is null) return res.NotFoundResponse(Messages.ProdAtributoValor.NOTATRIBUTO);
                ProdAtributoValor atributoValor = new()
                {
                    Nombre = pav.Nombre,
                    Secuencia = pav.Secuencia,
                    Color = pav.Color,
                    ColorHtml = pav.ColorHtml,
                    Personalizable = pav.Personalizable,
                    Atributo = atr
                };
                db.ProdAtributoValor.Add(atributoValor);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.ProdAtributoValor.CREATED, CreateRes(atributoValor));
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/{id}", async (int id, ProdAtributoValorDTO pav, DBContext db) =>
            {
                var atributoValor = await db.ProdAtributoValor.FindAsync(id);
                if (atributoValor is null) return res.NotFoundResponse(Messages.ProdAtributoValor.NOTFOUND);
                atributoValor.IdAtributo = pav.IdAtributo;
                atributoValor.Nombre = pav.Nombre;
                atributoValor.Secuencia = pav.Secuencia;
                atributoValor.Color = pav.Color;
                atributoValor.ColorHtml = pav.ColorHtml;
                atributoValor.Personalizable = pav.Personalizable;
                atributoValor.FechaModificacion = DateTime.UtcNow;
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.ProdAtributoValor.UPDATED, CreateRes(atributoValor));
            }).RequireAuthorization().WithTags(tag);

            app.MapDelete(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                var atributoValor = await db.ProdAtributoValor.FindAsync(id);
                if (atributoValor is null) return res.NotFoundResponse(Messages.ProdAtributoValor.NOTFOUND);
                db.ProdAtributoValor.Remove(atributoValor);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.ProdAtributoValor.DELETED, "");
            }).RequireAuthorization().WithTags(tag);
        }
    }
}