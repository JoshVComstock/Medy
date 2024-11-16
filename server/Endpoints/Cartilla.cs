using server.Data;
using server.Models;
using server.Responses;
using server.Utils;
using server.Dtos;
using Microsoft.EntityFrameworkCore;
using server.Constants;

namespace server.Endpoints
{
    public static class CartillaExt
    {
        public static CartillaRes CreateCartillaRes(Cartilla car)
        {
            return new CartillaRes
            {
                Id = car.Id,
                Antibioticos = car.Antibioticos,
                CodigoBarras = car.CodigoBarras,
                FechaTomaMuestras = car.FechaTomaMuestras,
                Notas = car.Notas,
                NumeroMuestra = car.NumeroMuestra,
                Transfucion = car.Transfucion,
                IdUsrCreacion = car.IdUsrCreacion,
                IdUsrModificacion = car.IdUsrModificacion,
                Estado = car.Estado,
                FechaCreacion = car.FechaCreacion,
                FechaModificacion = car.FechaModificacion,
                //paciente
                NombrePaciente = car.Paciente.Nombre,
                SexoPaciente = car.Paciente.Sexo,
                EdadGestacionalDiaPaciente = car.Paciente.EdadGestacionalDia,
                EdadGestacionalSemanaPaciente = car.Paciente.EdadGestacionalSemana,
                FechaNacimientoPaciente = car.Paciente.FechaNacimiento,
                PesoNacimientoPaciente = car.Paciente.PesoNacimiento,
                NacimientoTerminoPaciente = car.Paciente.NacimientoTermino,
                //madre
                NombreMadre = car.Paciente.Madre.Nombre,
                CiMadre = car.Paciente.Madre.Ci,
                DireccionMadre = car.Paciente.Madre.Direccion,
                DetalleDireccionMadre = car.Paciente.Madre.DetalleDireccion,
                TelefonoMadre = car.Paciente.Madre.Telefono,
                TelefonoEmergenciaMadre = car.Paciente.Madre.TelefonoEmergencia,
                TratamientoHipertiroidismo = car.Paciente.Madre.TratamientoHipertiroidismo,
                TratamientoHiportiroidismo = car.Paciente.Madre.TratamientoHiportiroidismo,
                TratamientoMadre = car.Paciente.Madre.Tratamiento,
                EnfermedadMadre = car.Paciente.Madre.Enfermedad,
                IdProvincia = car.Paciente.Madre.IdProvincia
            };
        }
        public static IQueryable<Cartilla> Includes(this IQueryable<Cartilla> query)
        {
            return query
            .Include(m => m.Paciente).ThenInclude(m => m.Madre);
        }
        public static IQueryable<CartillaRes> GetRes(this IQueryable<Cartilla> query)
        {
            return query.Includes().Select(entity => CreateCartillaRes(entity));
        }
        public static void CartillaEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Cartilla";
            string baseUrl = "/cartilla";

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var Cartilla = await db.Cartilla.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.Cartilla.GET, Cartilla);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var Cartilla = await db.Cartilla.IgnoreQueryFilters().GetRes().ToListAsync();
                return res.SuccessResponse(Messages.Cartilla.GET, Cartilla);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                return await db.Cartilla.Where(car => car.Id == id).GetRes().FirstOrDefaultAsync() is CartillaRes e
                    ? res.SuccessResponse(Messages.Cartilla.FIND, e)
                    : res.NotFoundResponse(Messages.Cartilla.NOTFOUND);
            }).RequireAuthorization().WithTags(tag);
            app.MapGet(baseUrl + "/cartillaSinResultado", async (DBContext db) =>
            {
                var resultado = await db.Cartilla.Where(car => car.Resultado == null).GetRes().ToListAsync();
                return res.SuccessResponse(Messages.Cartilla.GET, resultado);
            }).RequireAuthorization().WithTags(tag);

            app.MapPost(baseUrl, async (CartillaDTO car, DBContext db) =>
            {
                var provincia = await db.Provincia.FindAsync(car.IdProvincia);
                if (provincia is null) return res.NotFoundResponse(Messages.Provincia.NOTFOUND);
                Madre madre = new()
                {
                    Nombre = car.NombreMadre,
                    Ci = car.CiMadre,
                    Direccion = car.DireccionMadre,
                    DetalleDireccion = car.DetalleDireccionMadre,
                    Telefono = car.TelefonoMadre,
                    TelefonoEmergencia = car.TelefonoEmergenciaMadre,
                    TratamientoHiportiroidismo = car.TratamientoHiportiroidismo,
                    TratamientoHipertiroidismo = car.TratamientoHipertiroidismo,
                    Tratamiento = car.TratamientoMadre,
                    Enfermedad = car.EnfermedadMadre,
                    Provincia = provincia
                };
                Paciente paciente = new()
                {
                    Nombre = car.NombrePaciente,
                    Sexo = car.SexoPaciente,
                    EdadGestacionalSemana = car.EdadGestacionalSemanaPaciente,
                    EdadGestacionalDia = car.EdadGestacionalDiaPaciente,
                    FechaNacimiento = car.FechaNacimientoPaciente,
                    PesoNacimiento = car.PesoNacimientoPaciente,
                    NacimientoTermino = car.NacimientoTerminoPaciente,
                    Madre = madre
                };
                Cartilla cartilla = new()
                {
                    CodigoBarras = car.CodigoBarras,
                    FechaTomaMuestras = car.FechaTomaMuestras,
                    NumeroMuestra = car.NumeroMuestra,
                    Transfucion = car.Transfucion,
                    Antibioticos = car.Antibioticos,
                    Notas = car.Notas,
                    Paciente = paciente
                };
                db.Cartilla.Add(cartilla);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.Cartilla.CREATED, CreateCartillaRes(cartilla));
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/{id}", async (int id, CartillaDTO car, DBContext db) =>
                {
                    var cartilla = await db.Cartilla
                        .Include(c => c.Paciente)
                        .ThenInclude(p => p.Madre)
                        .FirstOrDefaultAsync(c => c.Id == id);

                    if (cartilla is null) return res.NotFoundResponse(Messages.Cartilla.NOTFOUND);
                    var provincia = await db.Provincia.FindAsync(car.IdProvincia);
                    if (provincia is null) return res.NotFoundResponse(Messages.Provincia.NOTFOUND);

                    // Actualizar datos de la Madre
                    var madre = cartilla.Paciente.Madre;
                    madre.Nombre = car.NombreMadre;
                    madre.Ci = car.CiMadre;
                    madre.Direccion = car.DireccionMadre;
                    madre.DetalleDireccion = car.DetalleDireccionMadre;
                    madre.Telefono = car.TelefonoMadre;
                    madre.TelefonoEmergencia = car.TelefonoEmergenciaMadre;
                    madre.TratamientoHiportiroidismo = car.TratamientoHiportiroidismo;
                    madre.TratamientoHipertiroidismo = car.TratamientoHipertiroidismo;
                    madre.Tratamiento = car.TratamientoMadre;
                    madre.Enfermedad = car.EnfermedadMadre;
                    madre.Provincia = provincia;

                    // Actualizar datos del Paciente
                    var paciente = cartilla.Paciente;
                    paciente.Nombre = car.NombrePaciente;
                    paciente.Sexo = car.SexoPaciente;
                    paciente.EdadGestacionalSemana = car.EdadGestacionalSemanaPaciente;
                    paciente.EdadGestacionalDia = car.EdadGestacionalDiaPaciente;
                    paciente.FechaNacimiento = car.FechaNacimientoPaciente;
                    paciente.PesoNacimiento = car.PesoNacimientoPaciente;
                    paciente.NacimientoTermino = car.NacimientoTerminoPaciente;

                    // Actualizar datos de la Cartilla
                    cartilla.CodigoBarras = car.CodigoBarras;
                    cartilla.FechaTomaMuestras = car.FechaTomaMuestras;
                    cartilla.NumeroMuestra = car.NumeroMuestra;
                    cartilla.Transfucion = car.Transfucion;
                    cartilla.Antibioticos = car.Antibioticos;
                    cartilla.Notas = car.Notas;

                    await db.SaveChangesAsync();

                    return res.SuccessResponse(Messages.Cartilla.UPDATED, CreateCartillaRes(cartilla));
                }).RequireAuthorization().WithTags(tag);


            app.MapDelete(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                var cartilla = await db.Cartilla.FindAsync(id);
                if (cartilla is null) return res.NotFoundResponse(Messages.Cartilla.NOTFOUND);
                db.Cartilla.Remove(cartilla);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.Cartilla.DELETED, "");
            }).RequireAuthorization().WithTags(tag);
        }
    }
}
