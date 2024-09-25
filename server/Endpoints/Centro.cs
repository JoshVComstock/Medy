using server.Data;
using server.Models;
using server.Responses;
using server.Utils;
using server.Dtos;
using Microsoft.EntityFrameworkCore;
using server.Constants;

namespace server.Endpoints
{
    public static class CentroExt
    {
        public static CentroRes CreateCentroRes(Centro pv)
        {
            return new CentroRes
            {
                Id = pv.Id,
                IdMunicipio = pv.IdMunicipio,
                Municipio = pv.Municipio.Nombre,
                Nombre = pv.Nombre,
                Area = pv.Area,
                Contacto = pv.Contacto,
                Direccion = pv.Direccion,
                SeguimientoCasos = pv.SeguimientoCasos,
                Telefono = pv.Telefono,
                IdUsrCreacion = pv.IdUsrCreacion,
                IdUsrModificacion = pv.IdUsrModificacion,
                Estado = pv.Estado,
                FechaCreacion = pv.FechaCreacion,
                FechaModificacion = pv.FechaModificacion
            };
        }
        public static IQueryable<Centro> Includes(this IQueryable<Centro> query)
        {
            return query
            .Include(m => m.Municipio).ThenInclude(m => m.Provincia);
            ;
        }
        public static IQueryable<CentroRes> GetRes(this IQueryable<Centro> query)
        {
            return query.Includes().Select(entity => CreateCentroRes(entity));
        }
        public static void CentroEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Centro";
            string baseUrl = "/centro";

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var Centro = await db.Centro.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.Centro.GET, Centro);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var centro = await db.Centro.IgnoreQueryFilters().Select(pv => CreateCentroRes(pv)).ToListAsync();
                return res.SuccessResponse(Messages.Centro.GET, centro);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                return await db.Centro.Where(pv => pv.Id == id).Select(pv => CreateCentroRes(pv)).FirstOrDefaultAsync() is CentroRes e
                    ? res.SuccessResponse(Messages.Centro.FIND, e)
                    : res.NotFoundResponse(Messages.Centro.NOTFOUND);
            }).RequireAuthorization().WithTags(tag);

            app.MapPost(baseUrl, async (CentroDTO pv, DBContext db) =>
            {
                var muni = await db.Municipio.FindAsync(pv.IdMunicipio);
                if (muni is null) return res.NotFoundResponse(Messages.Municipio.NOTFOUND);
                Centro centro = new()
                {
                    Nombre = pv.Nombre,
                    Municipio = muni,
                    Area = pv.Area,
                    Contacto = pv.Contacto,
                    Direccion = pv.Direccion,
                    SeguimientoCasos = pv.SeguimientoCasos,
                    Telefono = pv.Telefono
                };
                db.Centro.Add(centro);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.Centro.CREATED, CreateCentroRes(centro));
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/{id}", async (int id, CentroDTO pv, DBContext db) =>
            {
                var centro = await db.Centro.FindAsync(id);
                if (centro is null) return res.NotFoundResponse(Messages.Centro.NOTFOUND);
                var muni = await db.Municipio.FindAsync(pv.IdMunicipio);
                if (muni is null) return res.NotFoundResponse(Messages.Municipio.NOTFOUND);
                centro.Municipio = muni;
                centro.Nombre = pv.Nombre;
                centro.Area = pv.Area;
                centro.Contacto = pv.Contacto;
                centro.Direccion = pv.Direccion;
                centro.SeguimientoCasos = pv.SeguimientoCasos;
                centro.Telefono = pv.Telefono;
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.Centro.UPDATED, CreateCentroRes(centro));
            }).RequireAuthorization().WithTags(tag);

            app.MapDelete(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                var centro = await db.Centro.FindAsync(id);
                if (centro is null) return res.NotFoundResponse(Messages.Centro.NOTFOUND);
                db.Centro.Remove(centro);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.Centro.DELETED, "");
            }).RequireAuthorization().WithTags(tag);
        }
    }
}
