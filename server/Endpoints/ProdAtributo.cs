using server.Data;
using server.Models;
using server.Responses;
using server.Utils;
using server.Dtos;
using Microsoft.EntityFrameworkCore;
using server.Constants;

namespace server.Endpoints
{
    public static class ProdAtributoExt
    {
        public static ProdAtributoRes CreateProdAtributoRes(ProdAtributo pa)
        {
            return new ProdAtributoRes
            {
                Id = pa.Id,
                Secuencia = pa.Secuencia,
                Nombre = pa.Nombre,
                TipoVisualizacion = pa.TipoVisualizacion,
                ModoCreacion = pa.ModoCreacion,
                FechaCreacion = pa.FechaCreacion,
                FechaModificacion = pa.FechaModificacion,
                Estado = pa.Estado,
                IdUsrCreacion = pa.IdUsrCreacion,
                IdUsrModificacion = pa.IdUsrModificacion
            };
        }

        public static void ProdAtributoEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Producto Atributo";
            string baseUrl = "/productoAtributo";

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var productoAtributo = await db.ProdAtributo.Select(pa => CreateProdAtributoRes(pa)).ToListAsync();
                return res.SuccessResponse(Messages.ProdAtributo.GET, productoAtributo);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var productoAtributo = await db.ProdAtributo.IgnoreQueryFilters().Select(pa => CreateProdAtributoRes(pa)).ToListAsync();
                return res.SuccessResponse(Messages.ProdAtributo.GET, productoAtributo);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                return await db.ProdAtributo.Where(pa => pa.Id == id).Select(pa => CreateProdAtributoRes(pa)).FirstOrDefaultAsync() is ProdAtributoRes e
                    ? res.SuccessResponse(Messages.ProdAtributo.FIND, e)
                    : res.NotFoundResponse(Messages.ProdAtributo.NOTFOUND);
            }).RequireAuthorization().WithTags(tag);

            app.MapPost(baseUrl, async (ProdAtributoDTO pa, DBContext db) =>
            {
                var exit = await db.ProdAtributo.AnyAsync(e => e.Nombre == pa.Nombre);
                if (exit) return res.BadRequestResponse(Messages.ProdAtributo.EXISTS);

                ProdAtributo atributo = new()
                {
                    Secuencia = pa.Secuencia,
                    Nombre = pa.Nombre,
                    TipoVisualizacion = pa.TipoVisualizacion,
                    ModoCreacion = pa.ModoCreacion
                };
                db.ProdAtributo.Add(atributo);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.ProdAtributo.CREATED, CreateProdAtributoRes(atributo));
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/{id}", async (int id, ProdAtributoDTO pa, DBContext db) =>
            {
                var exit = await db.ProdAtributo.AnyAsync(e => e.Nombre == pa.Nombre && e.Id != id);
                if (exit) return res.BadRequestResponse(Messages.ProdAtributo.EXISTS);
                var atributo = await db.ProdAtributo.FindAsync(id);
                if (atributo is null) return res.NotFoundResponse(Messages.ProdAtributo.NOTFOUND);
                atributo.Nombre = pa.Nombre;
                atributo.TipoVisualizacion = pa.TipoVisualizacion;
                atributo.ModoCreacion = pa.ModoCreacion;
                atributo.FechaModificacion = DateTime.UtcNow;
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.ProdAtributo.UPDATED, CreateProdAtributoRes(atributo));
            }).RequireAuthorization().WithTags(tag);

            app.MapDelete(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                var atributo = await db.ProdAtributo.FindAsync(id);
                if (atributo is null) return res.NotFoundResponse(Messages.ProdAtributo.NOTFOUND);
                db.ProdAtributo.Remove(atributo);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.ProdAtributo.DELETED, "");
            }).RequireAuthorization().WithTags(tag);
        }
    }
}
