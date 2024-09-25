using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Responses;
using server.Dtos;
using server.Utils;
using server.Constants;
using NPOI.SS.Formula.Functions;

namespace server.Endpoints
{
    public static class PacienteExt
    {
        public static PacienteRes CreatePacienteRes(Paciente td)
        {
            return new PacienteRes
            {
                Id = td.Id,
                Estado = td.Estado,
                EdadGestacionalDiaPaciente = td.EdadGestacionalDia,
                EdadGestacionalSemanaPaciente = td.EdadGestacionalSemana,
                FechaNacimientoPaciente = td.FechaNacimiento,
                NacimientoTerminoPaciente = td.NacimientoTermino,
                NombrePaciente = td.Nombre,
                PesoNacimientoPaciente = td.PesoNacimiento,
                SexoPaciente = td.Sexo,
                FechaCreacion = td.FechaCreacion,
                FechaModificacion = td.FechaModificacion,
                IdUsrCreacion = td.IdUsrCreacion,
                IdUsrModificacion = td.IdUsrModificacion,
                Madre = td.Madre.Nombre
            };
        }
        public static IQueryable<Paciente> Includes(this IQueryable<Paciente> query)
        {
            return query.Include(m => m.Madre);
        }
        public static IQueryable<PacienteRes> GetRes(this IQueryable<Paciente> query)
        {
            return query.Includes().Select(entity => CreatePacienteRes(entity));
        }
         public static void PacienteEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Paciente";
            string baseUrl = "/paciente";

          
            app.MapGet(baseUrl, async (DBContext db) =>
           {
               var paciente = await db.Paciente.GetRes().ToListAsync();
               return res.SuccessResponse(Messages.Paciente.GET, paciente);
           }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var paciente = await db.Paciente.IgnoreQueryFilters().Select(mun => CreatePacienteRes(mun)).ToListAsync();
                return res.SuccessResponse(Messages.Paciente.GET, paciente);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                return await db.Paciente.Where(mun => mun.Id == id).Select(mun => CreatePacienteRes(mun)).FirstOrDefaultAsync() is PacienteRes e
                    ? res.SuccessResponse(Messages.Paciente.FIND, e)
                    : res.NotFoundResponse(Messages.Paciente.NOTFOUND);
            }).RequireAuthorization().WithTags(tag);
           }
    }
}