using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Responses;
using server.Dtos;
using server.Utils;
using server.Constants;

namespace server.Endpoints
{
    public static class VentaOrdenDetalleExt
    {
        public static VentaOrdenDetalleRes CreateRes(VentaOrdenDetalle vo)
        {
            return new VentaOrdenDetalleRes
            {
                Id = vo.Id,
                Cantidad = vo.Cantidad,
                Estado = vo.Estado,
                FechaCreacion = vo.FechaCreacion,
                FechaModificacion = vo.FechaModificacion,
                IdEmpaquetado = vo.IdEmpaquetado,
                IdMoneda=vo.IdMoneda,
                IdProducto=vo.IdProducto,
                IdUnidadMedida=vo.IdUnidadMedida,
                IdUsrCreacion = vo.IdUsrCreacion,
                IdUsrModificacion = vo.IdUsrModificacion,
                Nombre = vo.Nombre,
                PrecioImpuesto = vo.PrecioImpuesto,
                PrecioUnitario = vo.PrecioUnitario,
                CantidadEnviada = vo.CantidadEnviada,
                CodigoInterno = vo.CodigoInterno,
                Descuento = vo.Descuento,
                EstadoFacturacion = vo.EstadoFacturacion,
                EstadoOrden = vo.EstadoOrden,
                PrecioReducido = vo.PrecioReducido,
                PrecioUnitConImpuesto = vo.PrecioUnitConImpuesto,
                PrecioUnitSinImpuesto = vo.PrecioUnitSinImpuesto,
                Secuencia = vo.Secuencia,
                SubtotalConImpuesto = vo.SubtotalConImpuesto,
                SubtotalSinImpuesto = vo.SubtotalSinImpuesto,
                TiempoEspera = vo.TiempoEspera,
                IdVentaOrden = vo.IdVentaOrden
            };
        }
        public static IQueryable<VentaOrdenDetalle> Includes(this IQueryable<VentaOrdenDetalle> query)
        {
            return query;
        }
        public static IQueryable<VentaOrdenDetalleRes> GetRes(this IQueryable<VentaOrdenDetalle> query)
        {
            return query.Includes().Select(entity => CreateRes(entity));
        }
    }
}