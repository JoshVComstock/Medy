using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Responses;
using server.Dtos;
using server.Utils;
using server.Constants;
using System.ServiceModel.Channels;

namespace server.Endpoints
{
    public static class VentaOrdenExt
    {
        public static VentaOrdenRes CreateRes(VentaOrden vo)
        {
            return new VentaOrdenRes
            {
                Id = vo.Id,
                Empresa = RecEmpresaExt.CreateEmpresaInfoRes(vo.Empresa),
                Moneda = RecMonedaExt.CreateMonedaRes(vo.Moneda),
                MontoImpuesto = vo.MontoImpuesto,
                MontoSinImpuesto = vo.MontoImpuesto,
                MontoTotal = vo.MontoTotal,
                Nota = vo.Nota,
                Estado = vo.Estado,
                FechaCreacion = vo.FechaCreacion,
                FechaModificacion = vo.FechaModificacion,
                IdUsrCreacion = vo.IdUsrCreacion,
                IdUsrModificacion = vo.IdUsrModificacion,
                CodigoOrden = vo.CodigoOrden,
                EstadoFacturacion = vo.EstadoFacturacion,
                EstadoOrden = vo.EstadoOrden,
                FechaValidez = vo.FechaValidez,
                IdAlmacen = vo.IdAlmacen,
                IdCliente = vo.IdCliente,
                IdEquipo = vo.IdEquipo,
                IdPrecio = vo.IdPrecio,
                IdTerminosPago = vo.IdTerminosPago,
                IdVendedor = vo.IdVendedor,
                MontoImpago = vo.MontoImpago,
                Tc = vo.Tc,
                Toker = vo.Toker,
                VentaOrdenDetalles = vo.VentaOrdenDetalle.AsQueryable().GetRes().ToList(),
            };
        }
        public static IQueryable<VentaOrden> Includes(this IQueryable<VentaOrden> query)
        {
            return query
            .Include(cb => cb.Empresa)
            .Include(cb => cb.Moneda)
            .Include(cb => cb.VentaOrdenDetalle);
        }
        public static IQueryable<VentaOrdenRes> GetRes(this IQueryable<VentaOrden> query)
        {
            return query.Includes().Select(entity => CreateRes(entity));
        }

        public static void VentaOrdenEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Venta";
            string baseUrl = "/ventaOrden";

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var venta = await db.VentaOrden.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.VentaOrden.GET, venta);
            }).RequireAuthorization().WithTags(tag);
            app.MapGet(baseUrl + "/today", async (DBContext db) =>
            {
                var fechaActualUtc = DateTime.UtcNow;
                var ventasFechaActual = await db.VentaOrden
                    .Where(v =>  v.FechaCreacion.Date == fechaActualUtc)
                    .GetRes()
                    .ToListAsync();
                return res.SuccessResponse(Messages.VentaOrden.GET, ventasFechaActual);
            }).RequireAuthorization().WithTags(tag);


            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var venta = await db.VentaOrden.IgnoreQueryFilters().GetRes().ToListAsync();
                return res.SuccessResponse(Messages.VentaOrden.GET, venta);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id:int}", async (int id, DBContext db) =>
            {
                var venta = await db.VentaOrden.Where(cda => cda.Id == id).GetRes().ToListAsync();
                return res.SuccessResponse(Messages.VentaOrden.GET, venta);
            }).RequireAuthorization().WithTags(tag);

            app.MapPost(baseUrl, async (VentaOrdenDTO vo, DBContext db) =>
            {
                var am = await db.RecMoneda.FindAsync(vo.IdMoneda);
                if (am == null) return res.NotFoundResponse(Messages.Moneda.NOTFOUND);
                var em = await db.RecEmpresa.FindAsync(vo.IdEmpresa);
                if (em == null) return res.NotFoundResponse(Messages.RecEmpresa.NOTFOUND);
                VentaOrden orden = new()
                {
                    Moneda = am,
                    Empresa = em,
                    Nota = vo.Nota,
                    MontoSinImpuesto = vo.MontoSinImpuesto,
                    MontoImpuesto = vo.MontoImpuesto,
                    MontoTotal = vo.MontoTotal,
                    CodigoOrden = vo.CodigoOrden,
                    EstadoFacturacion = vo.EstadoFacturacion,
                    EstadoOrden = vo.EstadoOrden,
                    FechaValidez = vo.FechaValidez,
                    IdAlmacen = vo.IdAlmacen,
                    IdCliente = vo.IdCliente,
                    IdEquipo = vo.IdEquipo,
                    IdPrecio = vo.IdPrecio,
                    IdTerminosPago = vo.IdTerminosPago,
                    IdVendedor = vo.IdVendedor,
                    MontoImpago = vo.MontoImpago,
                    Tc = vo.Tc,
                    Toker = vo.Toker,

                };

                foreach (var c in vo.VentaOrdenDetalle)
                {
                    var pd = await db.ProdProducto.FindAsync(c.IdProducto);
                    if (pd == null) return res.NotFoundResponse(Messages.ProdProducto.NOTFOUND);
                    var m = await db.RecMoneda.FindAsync(c.IdMoneda);
                    if (m == null) return res.NotFoundResponse(Messages.Moneda.NOTFOUND);
                    var um = await db.UmUnidadMedida.FindAsync(c.IdUnidadMedida);
                    if (um == null) return res.NotFoundResponse(Messages.UmUnidadMedida.NOTFOUND);
                    VentaOrdenDetalle detalle = new()
                    {
                        Moneda = m,
                        UnidadMedida = um,
                        Producto = pd,
                        IdEmpaquetado = c.IdEmpaquetado,
                        Nombre = c.Nombre,
                        Cantidad = c.Cantidad,
                        VentaOrden = orden,
                        CantidadEnviada = c.CantidadEnviada,
                        CodigoInterno = c.CodigoInterno,
                        Descuento = c.Descuento,
                        EstadoFacturacion = c.EstadoFacturacion,
                        EstadoOrden = c.EstadoOrden,
                        PrecioImpuesto = c.IdProducto,
                        PrecioReducido = c.PrecioReducido,
                        PrecioUnitario = c.PrecioUnitario,
                        PrecioUnitConImpuesto = c.PrecioUnitConImpuesto,
                        PrecioUnitSinImpuesto = c.PrecioUnitSinImpuesto,
                        Secuencia = c.Secuencia,
                        SubtotalConImpuesto = c.SubtotalConImpuesto,
                        SubtotalSinImpuesto = c.SubtotalSinImpuesto,
                        TiempoEspera = c.TiempoEspera,
                    };
                    orden.VentaOrdenDetalle.Add(detalle);

                }
                db.VentaOrden.Add(orden);

                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.VentaOrden.CREATED, CreateRes(orden));
            }).RequireAuthorization().WithTags(tag);

        }
    }
}