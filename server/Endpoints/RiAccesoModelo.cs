﻿using server.Data;
using server.Models;
using server.Responses;
using server.Utils;
using server.Dtos;
using Microsoft.EntityFrameworkCore;
using server.Constants;

namespace server.Endpoints
{
    public static class RiAccesoModeloExt
    {
        public static RiAccesoModeloRes CreateRes(RiAccesoModelo ram)
        {
            return new RiAccesoModeloRes
            {
                Id = ram.Id,
                Estado = ram.Estado,
                Crear = ram.Crear,
                Editar = ram.Editar,
                Eliminar = ram.Eliminar,
                FechaCreacion = ram.FechaCreacion,
                FechaModificacion = ram.FechaModificacion,
                IdGrupo = ram.IdGrupo,
                IdModelo = ram.IdModelo,
                NombreModelo = ram.Modelo.Modelo,
                Ver = ram.Ver,
                IdUsrCreacion = ram.IdUsrModificacion,
                IdUsrModificacion = ram.IdUsrModificacion,
            };
        }
        public static IQueryable<RiAccesoModelo> Includes(this IQueryable<RiAccesoModelo> query)
        {
            return query.Include(ram => ram.Modelo);
        }
        public static IQueryable<RiAccesoModeloRes> GetRes(this IQueryable<RiAccesoModelo> query)
        {
            return query.Includes().Select(entity => CreateRes(entity));
        }
    }
}