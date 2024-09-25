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
    public static class ProdTarifaDetalleExt
    {
        public static ProdTarifaDetalleRes CreateRes(ProdTarifaDetalle td)
        {
            return new ProdTarifaDetalleRes
            {
                Id = td.Id,
                Estado = td.Estado,
                FechaCreacion = td.FechaCreacion,
                FechaModificacion = td.FechaModificacion,
                IdMoneda = td.IdMoneda,
                IdProducto = td.IdProducto,
                IdUsrCreacion = td.IdUsrCreacion,
                AplicadoEn = td.AplicadoEn,
                CantidadMin = td.CantidadMin,
                Descuento = td.Descuento,
                FechaFin = td.FechaFin,
                FechaInicio = td.FechaInicio,
                IdProductoBase = td.IdProductoBase,
                IdProductoCategoria = td.IdProductoCategoria,
                IdTarifa = td.IdTarifa,
                IdUsrModificacion = td.IdUsrModificacion,
                PrecioComputable = td.PrecioComputable,
                PrecioFijo = td.PrecioFijo
            };
        }
        public static IQueryable<ProdTarifaDetalle> Includes(this IQueryable<ProdTarifaDetalle> query)
        {
            return query;
        }
        public static IQueryable<ProdTarifaDetalleRes> GetRes(this IQueryable<ProdTarifaDetalle> query)
        {
            return query.Includes().Select(entity => CreateRes(entity));
        }
    }
}