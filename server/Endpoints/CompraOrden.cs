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
    public static class CompraOrdenExt
    {
        public static CompraOrdenRes CreateRes(CompraOrden co)
        {
            return new CompraOrdenRes
            {
                Id = co.Id,
                Proveedor = RecContactoExt.CreateRes(co.Proveedor),
                Moneda = RecMonedaExt.CreateMonedaRes(co.Moneda),
                Empresa = RecEmpresaExt.CreateEmpresaInfoRes(co.Empresa),
                CodOrden = co.CodOrden,
                EstadoCompra = co.EstadoCompra,
                FechaConfirmacion = co.FechaConfirmacion,
                FechaEntregaPlani = co.FechaEntregaPlani,
                FechaLimitePedido = co.FechaLimitePedido,
                IdUsrComprador = co.IdUsrComprador,
                MontoImpuesto = co.MontoImpuesto,
                MontoSinImpuesto = co.MontoImpuesto,
                MontoTotal = co.MontoTotal,
                Nota = co.Nota,
                Estado = co.Estado,
                FechaCreacion = co.FechaCreacion,
                FechaModificacion = co.FechaModificacion,
                IdUsrCreacion = co.IdUsrCreacion,
                IdUsrModificacion = co.IdUsrModificacion,
                Prioridad = co.Prioridad,
                RefProveedor = co.RefProveedor,
                OrdenDetalles = co.CompraOrdenDetalle.AsQueryable().GetRes().ToList(),
            };
        }
        public static IQueryable<CompraOrden> Includes(this IQueryable<CompraOrden> query)
        {
            return query.Include(cb => cb.CompraOrdenDetalle).Include(c => c.Proveedor).Include(m => m.Moneda).Include(e => e.Empresa);
        }
        public static IQueryable<CompraOrdenRes> GetRes(this IQueryable<CompraOrden> query)
        {
            return query.Includes().Select(entity => CreateRes(entity));
        }

        public static void CompraOrdenEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Compra";
            string baseUrl = "/compraOrden";

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var accounts = await db.CompraOrden.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.CompraOrden.GET, accounts);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var accounts = await db.CompraOrden.IgnoreQueryFilters().GetRes().ToListAsync();
                return res.SuccessResponse(Messages.CompraOrden.GET, accounts);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id:int}", async (int id, DBContext db) =>
            {
                var compra = await db.CompraOrden.Where(cda => cda.Id == id).GetRes().ToListAsync();
                return res.SuccessResponse(Messages.CompraOrden.GET, compra);
            }).RequireAuthorization().WithTags(tag);

            app.MapPost(baseUrl, async (CompraOrdenDTO co, DBContext db) =>
            {
                var pr = await db.RecContacto.FindAsync(co.IdProveedor);
                if (pr == null) return res.NotFoundResponse(Messages.CompraOrden.NOTCONTACTO);
                var mo = await db.RecMoneda.FindAsync(co.IdMoneda);
                if (mo == null) return res.NotFoundResponse(Messages.CompraOrden.NOTMONEDA);
                var em = await db.RecEmpresa.FindAsync(co.IdEmpresa);
                if (em == null) return res.NotFoundResponse(Messages.CompraOrden.NOTEMPRESA);
                CompraOrden orden = new()
                {
                    Moneda = mo,
                    RefProveedor = co.RefProveedor,
                    CodOrden = co.CodOrden,
                    Empresa = em,
                    EstadoCompra = co.EstadoCompra,
                    Prioridad = co.Prioridad,
                    Nota = co.Nota,
                    IdUsrComprador = co.IdUsrComprador,
                    MontoSinImpuesto = co.MontoSinImpuesto,
                    MontoImpuesto = co.MontoImpuesto,
                    MontoTotal = co.MontoTotal,
                    FechaLimitePedido = co.FechaLimitePedido,
                    FechaConfirmacion = co.FechaConfirmacion,
                    FechaEntregaPlani = co.FechaEntregaPlanifi,
                    Proveedor = pr
                };

                foreach (var c in co.CompraOrdenDetalle)
                {
                    var pd = await db.ProdProducto.FindAsync(c.IdProducto);
                    if (pd == null) return res.NotFoundResponse("No se encontro el producto");


                    var mon = await db.RecMoneda.FindAsync(c.IdMoneda);
                    if (mon == null) return res.NotFoundResponse("No se encontro la moneda");
                    var ud = await db.UmUnidadMedida.FindAsync(c.IdUnidadMedida);
                    if (ud == null) return res.NotFoundResponse("No se encontro la unidada de medida");
                    CompraOrdenDetalle detalle = new()
                    {
                        ProdProducto = pd,
                        IdUnidadMedida = c.IdUnidadMedida,
                        IdMoneda = c.IdMoneda,
                        IdEmpaquetado = c.IdEmpaquetado,
                        Nombre = c.Nombre,
                        Cantidad = c.Cantidad,
                        PrecioUnitario = c.PrecioUnitario,
                        PrecioSubtotal = c.PrecioSubtotal,
                        PrecioTotal = c.PrecioTotal,
                        PrecioImpuesto = c.PrecioImpuesto,
                        CantidadSolicitada = c.CantidadSolicitada,
                        CantidadRecibida = c.CantidadRecibida,
                        CantidadPaquete = c.CantidadPaquete,
                        FechaEsperada = c.FechaEsperada,
                        Moneda = mon,
                        UnidadMedida = ud,
                        CompraOrden = orden
                    };
                    orden.CompraOrdenDetalle.Add(detalle);

                }
                db.CompraOrden.Add(orden);

                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.CompraOrden.CREATED, CreateRes(orden));
            }).RequireAuthorization().WithTags(tag);

        }
    }
}