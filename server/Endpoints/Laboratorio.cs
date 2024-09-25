using server.Data;
using server.Models;
using server.Responses;
using server.Utils;
using server.Dtos;
using Microsoft.EntityFrameworkCore;
using server.Constants;

namespace server.Endpoints
{
    public static class LaboratorioExt
    {
        public static LaboratorioRes CreateLaboratorioRes(Laboratorio lab)
        {
            return new LaboratorioRes
            {
                Id = lab.Id,
                Direccion = lab.Direccion,
                Telefono = lab.Telefono,
                IdProvincia = lab.IdProvincia,
                Provincia = lab.Provincia.Nombre,
                Nombre = lab.Nombre,
                IdUsrCreacion = lab.IdUsrCreacion,
                IdUsrModificacion = lab.IdUsrModificacion,
                Estado = lab.Estado,
                FechaCreacion = lab.FechaCreacion,
                FechaModificacion = lab.FechaModificacion
            };
        }
        public static IQueryable<Laboratorio> Includes(this IQueryable<Laboratorio> query)
        {
            return query
            .Include(m => m.Provincia);
        }
        public static IQueryable<LaboratorioRes> GetRes(this IQueryable<Laboratorio> query)
        {
            return query.Includes().Select(entity => CreateLaboratorioRes(entity));
        }
        public static void LaboratorioEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Laboratorio";
            string baseUrl = "/laboratorio";

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var Laboratorio = await db.Laboratorio.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.Laboratorio.GET, Laboratorio);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var laboratorio = await db.Laboratorio.IgnoreQueryFilters().Select(lab => CreateLaboratorioRes(lab)).ToListAsync();
                return res.SuccessResponse(Messages.Laboratorio.GET, laboratorio);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                return await db.Laboratorio.Where(lab => lab.Id == id).Select(lab => CreateLaboratorioRes(lab)).FirstOrDefaultAsync() is LaboratorioRes e
                    ? res.SuccessResponse(Messages.Laboratorio.FIND, e)
                    : res.NotFoundResponse(Messages.Laboratorio.NOTFOUND);
            }).RequireAuthorization().WithTags(tag);

            app.MapPost(baseUrl, async (LaboratorioDTO lab, DBContext db) =>
            {
                var provi = await db.Provincia.FindAsync(lab.IdProvincia);
                if (provi is null) return res.NotFoundResponse(Messages.Provincia.NOTFOUND);
                Laboratorio laboratorio = new()
                {
                    Direccion = lab.Direccion,
                    Telefono = lab.Telefono,
                    Nombre = lab.Nombre,
                    Provincia = provi,
                };
                db.Laboratorio.Add(laboratorio);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.Laboratorio.CREATED, CreateLaboratorioRes(laboratorio));
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/{id}", async (int id, LaboratorioDTO lab, DBContext db) =>
            {
                var laboratorio = await db.Laboratorio.FindAsync(id);
                if (laboratorio is null) return res.NotFoundResponse(Messages.Laboratorio.NOTFOUND);
                var provi = await db.Provincia.FindAsync(lab.IdProvincia);
                if (provi is null) return res.NotFoundResponse(Messages.Provincia.NOTFOUND);
                laboratorio.Provincia = provi;
                laboratorio.Nombre = lab.Nombre;
                laboratorio.Direccion = lab.Direccion;
                laboratorio.Telefono = lab.Telefono;
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.Laboratorio.UPDATED, CreateLaboratorioRes(laboratorio));
            }).RequireAuthorization().WithTags(tag);

            app.MapDelete(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                var laboratorio = await db.Laboratorio.FindAsync(id);
                if (laboratorio is null) return res.NotFoundResponse(Messages.Laboratorio.NOTFOUND);
                db.Laboratorio.Remove(laboratorio);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.Laboratorio.DELETED, "");
            }).RequireAuthorization().WithTags(tag);
        }
    }
}
