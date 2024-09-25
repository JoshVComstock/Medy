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
    public static class ProdTarifaExt
    {
        public static ProdTarifaRes CreateRes(ProdTarifa pt)
        {
            return new ProdTarifaRes
            {
                Id = pt.Id,
                Moneda = RecMonedaExt.CreateMonedaRes(pt.RecMoneda),
                Empresa = RecEmpresaExt.CreateEmpresaInfoRes(pt.Empresa),
                Estado = pt.Estado,
                FechaCreacion = pt.FechaCreacion,
                FechaModificacion = pt.FechaModificacion,
                IdUsrCreacion = pt.IdUsrCreacion,
                IdUsrModificacion = pt.IdUsrModificacion,
                Nombre = pt.Nombre,
                PoliticaDescuento = pt.PoliticaDescuento,
                Secuencia = pt.Secuencia,
                TarifaDetalle = pt.ProdTarifaDetalle.AsQueryable().GetRes().ToList(),
            };
        }
        public static IQueryable<ProdTarifa> Includes(this IQueryable<ProdTarifa> query)
        {
            return query
            .Include(cb => cb.RecMoneda)
            .Include(cb => cb.Empresa)
            .Include(cb => cb.ProdTarifaDetalle);
        }
        public static IQueryable<ProdTarifaRes> GetRes(this IQueryable<ProdTarifa> query)
        {
            return query.Includes().Select(entity => CreateRes(entity));
        }

        public static void ProdTarifaEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Tarifa";
            string baseUrl = "/prodTarifa";

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var accounts = await db.ProdTarifa.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.ProdTarifa.GET, accounts);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var accounts = await db.ProdTarifa.IgnoreQueryFilters().GetRes().ToListAsync();
                return res.SuccessResponse(Messages.ProdTarifa.GET, accounts);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id:int}", async (int id, DBContext db) =>
            {
                var compra = await db.ProdTarifa.Where(cda => cda.Id == id).GetRes().ToListAsync();
                return res.SuccessResponse(Messages.ProdTarifa.GET, compra);
            }).RequireAuthorization().WithTags(tag);

            app.MapPost(baseUrl, async (ProdTarifaDTO co, DBContext db) =>
            {
                var pr = await db.RecMoneda.FindAsync(co.IdMoneda);
                if (pr == null) return res.NotFoundResponse(Messages.ProdTarifa.NOTMONEDA);
                var em = await db.RecEmpresa.FindAsync(co.IdEmpresa);
                if (em == null) return res.NotFoundResponse(Messages.ProdTarifa.NOTEMPRESA);
                ProdTarifa tarifa = new()
                {
                    Empresa = em,
                    Nombre = co.Nombre,
                    PoliticaDescuento = co.PoliticaDescuento,
                    RecMoneda = pr,
                    Secuencia = co.Secuencia
                };

                foreach (var c in co.TarifaDetalle)
                {
                    var pd = await db.ProdProducto.FindAsync(c.IdProducto);
                    if (pd == null) return res.NotFoundResponse(Messages.ProdTarifa.NOTPRODUCTO);
                    var mo = await db.RecMoneda.FindAsync(c.IdMoneda);
                    if (mo == null) return res.NotFoundResponse(Messages.ProdTarifa.NOTMONEDA);
                    var ba = await db.ProdProductoBase.FindAsync(c.IdProductoBase);
                    if (ba == null) return res.NotFoundResponse(Messages.ProdTarifa.NOTPRODUCTOBASE);
                    var ca = await db.ProdCategoria.FindAsync(c.IdProductoCategoria);
                    if (ca == null) return res.NotFoundResponse(Messages.ProdTarifa.NOTCATEGORIA);
                    ProdTarifaDetalle detalle = new()
                    {
                        ProdProducto = pd,
                        RecMoneda = mo,
                        AplicadoEn = c.AplicadoEn,
                        CantidadMin = c.CantidadMin,
                        Descuento = c.Descuento,
                        FechaFin = c.FechaFin,
                        FechaInicio = c.FechaInicio,
                        PrecioComputable = c.PrecioComputable,
                        PrecioFijo = c.PrecioFijo,
                        ProdCategoria = ca,
                        ProdProductoBase = ba,
                        ProdTarifa = tarifa,
                    };
                    tarifa.ProdTarifaDetalle.Add(detalle);
                }
                db.ProdTarifa.Add(tarifa);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.ProdTarifa.CREATED, CreateRes(tarifa));
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/{id}", async (int id, DBContext db, ProdTarifaDTO co) =>
            {
                var tarifa = await db.ProdTarifa.Includes().FirstOrDefaultAsync(pc => pc.Id == id);
                if (tarifa == null) return res.NotFoundResponse(Messages.ProdTarifa.NOTFOUND);

                var pr = await db.RecMoneda.FindAsync(co.IdMoneda);
                if (pr == null) return res.NotFoundResponse(Messages.ProdTarifa.NOTMONEDA);
                var em = await db.RecEmpresa.FindAsync(co.IdEmpresa);
                if (em == null) return res.NotFoundResponse(Messages.ProdTarifa.NOTEMPRESA);
                tarifa.RecMoneda = pr;
                tarifa.Empresa = em;
                tarifa.Secuencia = co.Secuencia;
                tarifa.Nombre = co.Nombre;
                tarifa.PoliticaDescuento = co.PoliticaDescuento;

                var detallesAEliminar = tarifa.ProdTarifaDetalle.Where(det => !co.TarifaDetalle.Any(dto => dto.Id == det.Id)).ToList();
                foreach (var detalle in detallesAEliminar)
                {
                    db.ProdTarifaDetalle.Remove(detalle);
                }
                foreach (var det in co.TarifaDetalle)
                {
                    var detalleExistente = tarifa.ProdTarifaDetalle.FirstOrDefault(d => d.Id == det.Id);

                    if (detalleExistente != null)
                    {

                        detalleExistente.IdMoneda = det.IdMoneda;
                        detalleExistente.IdProductoCategoria = det.IdProductoCategoria;
                        detalleExistente.IdProductoBase = det.IdProductoBase;
                        detalleExistente.IdProducto = det.IdProducto;
                        detalleExistente.PrecioComputable = det.PrecioComputable;
                        detalleExistente.PrecioFijo = det.PrecioFijo;
                        detalleExistente.Descuento = det.Descuento;
                        detalleExistente.AplicadoEn = det.AplicadoEn;
                        detalleExistente.CantidadMin = det.CantidadMin;
                        detalleExistente.FechaInicio = det.FechaInicio;
                        detalleExistente.FechaFin = det.FechaFin;
                        detalleExistente.ProdTarifa = tarifa;
                    }
                    else
                    {
                        var pd = await db.ProdProducto.FindAsync(det.IdProducto);
                        if (pd == null) return res.NotFoundResponse(Messages.ProdTarifa.NOTPRODUCTO);
                        var mo = await db.RecMoneda.FindAsync(det.IdMoneda);
                        if (mo == null) return res.NotFoundResponse(Messages.ProdTarifa.NOTMONEDA);
                        var ba = await db.ProdProductoBase.FindAsync(det.IdProductoBase);
                        if (ba == null) return res.NotFoundResponse(Messages.ProdTarifa.NOTPRODUCTOBASE);
                        var ca = await db.ProdCategoria.FindAsync(det.IdProductoCategoria);
                        if (ca == null) return res.NotFoundResponse(Messages.ProdTarifa.NOTCATEGORIA);
                        var nuevoDetalle = new ProdTarifaDetalle
                        {
                            RecMoneda = mo,
                            ProdCategoria = ca,
                            ProdProductoBase = ba,
                            ProdProducto = pd,
                            PrecioComputable = det.PrecioComputable,
                            PrecioFijo = det.PrecioFijo,
                            Descuento = det.Descuento,
                            AplicadoEn = det.AplicadoEn,
                            CantidadMin = det.CantidadMin,
                            FechaInicio = det.FechaInicio,
                            FechaFin = det.FechaFin,
                            ProdTarifa = tarifa
                        };
                        tarifa.ProdTarifaDetalle.Add(nuevoDetalle);
                    }
                }

                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.ProdTarifa.UPDATED, CreateRes(tarifa));
            }).RequireAuthorization().WithTags(tag);

            app.MapDelete(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                var tarifa = await db.ProdTarifa
                    .Include(ppb => ppb.ProdTarifaDetalle)
                    .FirstOrDefaultAsync(ppb => ppb.Id == id);
                if (tarifa is null) return res.NotFoundResponse(Messages.ProdTarifa.NOTFOUND);
                db.ProdTarifa.Remove(tarifa);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.ProdTarifa.DELETED, "");
            }).RequireAuthorization().WithTags(tag);
        }
    }
}