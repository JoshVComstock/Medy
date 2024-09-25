using server.Data;
using server.Models;
using server.Responses;
using server.Utils;
using server.Dtos;
using Microsoft.EntityFrameworkCore;
using server.Constants;

namespace server.Endpoints
{
    public static class ResultadoExt
    {
        public static ResultadoRes CreateResultadoRes(Resultado c)
        {
            return new ResultadoRes
            {
                Id = c.Id,
                CodigoBarra = c.Cartilla.CodigoBarras,
                FechaEntregado = c.FechaEntregado,
                FechaIngreso = c.FechaIngreso,
                FechaResultado = c.FechaResultado,
                Metodo = c.Metodo,
                Observacion = c.Observacion,
                ResultadoPaciente = c.ResultadoPaciente,
                ValorReferencia = c.ValorReferencia,
                ValorResultado = c.ValorReferencia,
                IdUsrCreacion = c.IdUsrCreacion,
                IdUsrModificacion = c.IdUsrModificacion,
                Estado = c.Estado,
                FechaCreacion = c.FechaCreacion,
                FechaModificacion = c.FechaModificacion,
                NobrePaciente = c.Cartilla.Paciente.Nombre
            };
        }
        public static IQueryable<Resultado> Includes(this IQueryable<Resultado> query)
        {
            return query.Include(m => m.Cartilla).ThenInclude(p => p.Paciente).Include(c => c.Laboratorio);
        }
        public static IQueryable<ResultadoRes> GetRes(this IQueryable<Resultado> query)
        {
            return query.Includes().Select(entity => CreateResultadoRes(entity));
        }
        public static void ResultadoEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Resultado";
            string baseUrl = "/resultado";

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var red = await db.Resultado.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.Resultado.GET, red);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/pacientePositivo", async (DBContext db) =>
{
    var red = await db.Resultado.Where(m => m.ResultadoPaciente == "POSITIVO").ToListAsync();
    return res.SuccessResponse(Messages.Resultado.GET, red);
}).RequireAuthorization().WithTags(tag);
            app.MapGet(baseUrl + "/pacienteNegativo", async (DBContext db) =>
{
    var red = await db.Resultado.Where(m => m.ResultadoPaciente == "NEGATIVO").ToListAsync();
    return res.SuccessResponse(Messages.Resultado.GET, red);
}).RequireAuthorization().WithTags(tag);
            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var red = await db.Resultado.IgnoreQueryFilters().Select(pv => CreateResultadoRes(pv)).ToListAsync();
                return res.SuccessResponse(Messages.Resultado.GET, red);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                return await db.Resultado.Where(pv => pv.Id == id).Select(pv => CreateResultadoRes(pv)).FirstOrDefaultAsync() is ResultadoRes e
                    ? res.SuccessResponse(Messages.Resultado.FIND, e)
                    : res.NotFoundResponse(Messages.Resultado.NOTFOUND);
            }).RequireAuthorization().WithTags(tag);


            app.MapPost(baseUrl, async (ResultadoDTO c, DBContext db) =>
            {
                var cartilla = await db.Cartilla.FindAsync(c.IdCartilla);
                if (cartilla is null) return res.NotFoundResponse(Messages.Cartilla.NOTFOUND);
                var lab = await db.Laboratorio.FindAsync(c.IdLaboratorio);
                if (lab is null) return res.NotFoundResponse(Messages.Laboratorio.NOTFOUND);
                Resultado resultado = new()
                {
                    Cartilla = cartilla,
                    FechaEntregado = c.FechaEntregado,
                    FechaIngreso = c.FechaIngreso,
                    FechaResultado = c.FechaResultado,
                    Laboratorio = lab,
                    Metodo = c.Metodo,
                    Observacion = c.Observacion,
                    ResultadoPaciente = c.ResultadoPaciente,
                    ValorReferencia = c.ValorReferencia,
                    ValorResultado = c.ValorResultado
                };
                db.Resultado.Add(resultado);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.Resultado.CREATED, CreateResultadoRes(resultado));
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/{id}", async (int id, ResultadoDTO pv, DBContext db) =>
            {
                var resultado = await db.Resultado.FindAsync(id);
                if (resultado is null) return res.NotFoundResponse(Messages.Resultado.NOTFOUND);

                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.Resultado.UPDATED, CreateResultadoRes(resultado));
            }).RequireAuthorization().WithTags(tag);

            app.MapDelete(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                var resultado = await db.Resultado.FindAsync(id);
                if (resultado is null) return res.NotFoundResponse(Messages.Resultado.NOTFOUND);
                db.Resultado.Remove(resultado);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.Resultado.DELETED, "");
            }).RequireAuthorization().WithTags(tag);
        }
    }
}
