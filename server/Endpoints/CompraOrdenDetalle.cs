using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Responses;
using server.Dtos;
using server.Utils;
using server.Constants;

namespace server.Endpoints
{
    public static class CompraOrdenDetalleExt
    {
        public static CompraOrdenDetalleRes CreateRes(CompraOrdenDetalle co)
        {
            return new CompraOrdenDetalleRes
            {
                Id = co.Id,
                Cantidad = co.Cantidad,
                CantidadPaquete = co.CantidadPaquete,
                CantidadRecibida = co.CantidadRecibida,
                CantidadSolicitada = co.CantidadSolicitada,
                Estado = co.Estado,
                FechaCreacion = co.FechaCreacion,
                FechaEsperada = co.FechaEsperada,
                FechaModificacion = co.FechaModificacion,
                IdCompraOrden = co.IdCompraOrden,
                IdEmpaquetado = co.IdEmpaquetado,
                IdMoneda = co.IdMoneda,
                IdProducto = co.IdProducto,
                IdUnidadMedida = co.IdUnidadMedida,
                IdUsrCreacion = co.IdUsrCreacion,
                IdUsrModificacion = co.IdUsrModificacion,
                Nombre = co.Nombre,
                PrecioImpuesto = co.PrecioImpuesto,
                PrecioSubtotal = co.PrecioSubtotal,
                PrecioTotal = co.PrecioTotal,
                PrecioUnitario = co.PrecioUnitario
            };
        }
        public static IQueryable<CompraOrdenDetalle> Includes(this IQueryable<CompraOrdenDetalle> query)
        {
            return query;
        }
        public static IQueryable<CompraOrdenDetalleRes> GetRes(this IQueryable<CompraOrdenDetalle> query)
        {
            return query.Includes().Select(entity => CreateRes(entity));
        }
        
    }
}