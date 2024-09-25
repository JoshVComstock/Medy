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
    public static class MadreExt
    {
        public static MadreRes CreateMadreRes(Madre td)
        {
            return new MadreRes
            {
                Id = td.Id,
                Estado = td.Estado,
                NombreMadre = td.Nombre,
                FechaCreacion = td.FechaCreacion,
                FechaModificacion = td.FechaModificacion,
                IdUsrCreacion = td.IdUsrCreacion,
                IdUsrModificacion = td.IdUsrModificacion,
                CiMadre = td.Ci,
                DetalleDireccionMadre = td.DetalleDireccion,
                DireccionMadre = td.Direccion,
                EnfermedadMadre = td.Enfermedad,
                ProvinciaMadre = td.Provincia.Nombre,
                TelefonoEmergenciaMadre = td.TelefonoEmergencia,
                TelefonoMadre = td.Telefono,
                TratamientoHipertiroidismo = td.TratamientoHiportiroidismo,
                TratamientoHiportiroidismo = td.TratamientoHiportiroidismo,
                TratamientoMadre = td.Tratamiento
            };
        }
        public static IQueryable<Madre> Includes(this IQueryable<Madre> query)
        {
            return query.Include(p => p.Provincia);
        }
        public static IQueryable<MadreRes> GetRes(this IQueryable<Madre> query)
        {
            return query.Includes().Select(entity => CreateMadreRes(entity));
        }
    }
}