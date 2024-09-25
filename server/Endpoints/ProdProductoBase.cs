using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Responses;
using server.Utils;
using server.Dtos;
using server.Constants;

namespace server.Endpoints
{
    public static class ProdProductoBaseExt
    {
        public static ProdProductoBaseRes CreateRes(ProdProductoBase ppb)
        {
            return new ProdProductoBaseRes
            {
                Id = ppb.Id,
                IdUnidadMedCompra = ppb.IdUnidadMedCompra,
                IdCategoria = ppb.IdCategoria,
                IdEmpresa = ppb.IdEmpresa,
                IdUnidadMedida = ppb.IdUnidadMedida,
                IdTipoProducto = ppb.IdTipoProducto,
                Secuencia = ppb.Secuencia,
                Color = ppb.Color,
                CodInterno = ppb.CodInterno,
                CodFabricante = ppb.CodFabricante,
                CodBarras = ppb.CodBarras,
                Prioridad = ppb.Prioridad,
                Nombre = ppb.Nombre,
                Descripcion = ppb.Descripcion,
                DescripcionCompra = ppb.DescripcionCompra,
                DescripcionVenta = ppb.DescripcionVenta,
                PrecioVenta = ppb.PrecioVenta,
                PrecioCosto = ppb.PrecioCosto,
                Volumen = ppb.Volumen,
                Peso = ppb.Peso,
                Vendible = ppb.Vendible,
                Comprable = ppb.Comprable,
                Configurable = ppb.Configurable,
                FechaCreacion = ppb.FechaCreacion,
                FechaModificacion = ppb.FechaModificacion,
                Trazabilidad = ppb.Trazabilidad,
                PlazoEntregaCli = ppb.PlazoEntregaCli,
                TipoServEnt = ppb.TipoServEnt,
                IdUsrCreacion = ppb.IdUsrCreacion,
                IdUsrModificacion = ppb.IdUsrModificacion,
                Estado = ppb.Estado,
                ProdBaseAtributoValor = ppb.ProdBaseAtributoValorRel.AsQueryable().Select(v => new ProdAtributoValorRelationalRes
                {
                    IdAtributo = v.AtributoValor.IdAtributo,
                    IdAtribValor = v.IdAtribValor,
                    PrecioExtra = v.PrecioExtra,
                }).ToList(),
                CantidadVariantes = ppb.ProdProducto.Where(pp => pp.Estado == States.ACTIVE).ToList().Count - 1
            };
        }
        public static IQueryable<ProdProductoBase> Includes(this IQueryable<ProdProductoBase> query)
        {
            return query
                .Include(ppb => ppb.ProdProducto)
                .Include(c => c.Categoria)
                .Include(m => m.Empresa)
                .Include(u => u.UnidadMedica)
                .Include(ppb => ppb.ProdBaseAtributoValorRel)
                    .ThenInclude(pbavr => pbavr.AtributoValor);
        }
        public static IQueryable<ProdProductoBaseRes> GetRes(this IQueryable<ProdProductoBase> query)
        {
            return query.Includes().Select(entity => CreateRes(entity));
        }

        // ============ START: Functions reusable to POST and PUT ============

        //* function to get the object AtributoValor
        public static async Task<ProdAtributoValor?> GetProdAtributoValor(this DBContext db, int idAtributoValor)
        {
            return await db.ProdAtributoValor.FindAsync(idAtributoValor);
        }

        public static ProdProducto CreateProdProducto(ProdProductoBase productoBase, ProdBaseAtribValorRel prodBaseAtribValorRel, ProdProductoBaseDTO ca, DateTime fecha, Boolean ThereIsIdProdBaseAtribValor = true)
        {
            //* when the client sends the boolean 'ThereIsIdProdBaseAtribValor' as false, it means that the client wanna save the IdProdBaseAtribValor as null
            return new ProdProducto
            {
                ProdProductoBase = productoBase,
                CodInterno = ca.CodInterno,
                CodFabricante = ca.CodFabricante,
                CodBarras = ca.CodBarras,
                Volumen = ca.Volumen,
                Peso = ca.Peso,
                FechaCreacion = fecha,
                FechaModificacion = fecha,
                PathImagen = "",
                Estado = States.ACTIVE,
                // IdProdBaseAtribValor = ThereIsIdProdBaseAtribValor ? prodBaseAtribValorRel.Id : null,
            };
        }

        // ============ END: Functions reusable to POST and PUT ============

        public static void ProdProductoBaseEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Prod Producto Base";
            string baseUrl = "/productoBase";

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var producto = await db.ProdProductoBase.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.ProdProductoBase.GET, producto);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var producto = await db.ProdProductoBase.IgnoreQueryFilters().GetRes().ToListAsync();
                return res.SuccessResponse(Messages.ProdProductoBase.GET, producto);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                return await db.ProdProductoBase.Where(ca => ca.Id == id).GetRes().FirstOrDefaultAsync() is ProdProductoBaseRes e
                    ? res.SuccessResponse(Messages.ProdProductoBase.FIND, e)
                    : res.NotFoundResponse(Messages.ProdProductoBase.NOTFOUND);
            }).RequireAuthorization().WithTags(tag);

            app.MapPost(baseUrl, async (ProdProductoBaseDTO ca, DBContext db) =>
            {
                var categoria = await db.ProdCategoria.FindAsync(ca.IdCategoria);
                if (categoria == null) return res.BadRequestResponse(Messages.ProdCategoria.NOTFOUND);
                var em = await db.RecEmpresa.FindAsync(ca.IdEmpresa);
                if (em == null) return res.BadRequestResponse(Messages.RecEmpresa.NOTFOUND);
                var un = await db.UmUnidadMedida.FindAsync(ca.IdUnidadMedida);
                if (un == null) return res.BadRequestResponse(Messages.UmUnidadMedida.NOTFOUND);
                var fecha = DateTime.UtcNow;
                // ============== start: create prod_producto_base ==============
                ProdProductoBase productoBase = new()
                {
                    CodBarras = ca.CodBarras,
                    CodFabricante = ca.CodFabricante,
                    CodInterno = ca.CodInterno,
                    Color = ca.Color,
                    Comprable = ca.Comprable,
                    Configurable = ca.Configurable,
                    Descripcion = ca.Descripcion,
                    DescripcionCompra = ca.DescripcionCompra,
                    DescripcionVenta = ca.DescripcionVenta,
                    IdTipoProducto = ca.IdTipoProducto,
                    UnidadMedica = un,
                    IdUnidadMedCompra = ca.IdUnidadMedCompra,
                    Nombre = ca.Nombre,
                    Peso = ca.Peso,
                    PlazoEntregaCli = ca.PlazoEntregaCli,
                    PrecioCosto = ca.PrecioCosto,
                    PrecioVenta = ca.PrecioVenta,
                    Prioridad = ca.Prioridad,
                    Secuencia = ca.Secuencia,
                    TipoServEnt = ca.TipoServEnt,
                    Trazabilidad = ca.Trazabilidad,
                    Vendible = ca.Vendible,
                    Volumen = ca.Volumen,
                    FechaCreacion = fecha,
                    FechaModificacion = fecha,
                    Categoria = categoria,
                    Empresa = em
                };
                db.ProdProductoBase.Add(productoBase);

                ProdProducto producto = new()
                {
                    CodBarras = ca.CodBarras,
                    CodFabricante = ca.CodFabricante,
                    CodInterno = ca.CodInterno,
                    PathImagen = null,
                    Peso = ca.Peso,
                    Volumen = ca.Volumen,
                    ProdProductoBase = productoBase
                };
                db.ProdProducto.Add(producto);

                await db.SaveChangesAsync();
                // ============== end: create prod_producto_base ==============

                return res.SuccessResponse(Messages.ProdProductoBase.CREATED, CreateRes(productoBase));
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/{id}", async (int id, ProdProductoBaseDTO ca, DBContext db) =>
            {
                var producto = await db.ProdProductoBase.Includes().FirstOrDefaultAsync(pc => pc.Id == id);
                if (producto == null) return res.NotFoundResponse(Messages.ProdProductoBase.NOTFOUND);

                var categoria = await db.ProdCategoria.FindAsync(ca.IdCategoria);
                if (categoria == null) return res.BadRequestResponse(Messages.ProdCategoria.NOTFOUND);
                var em = await db.RecEmpresa.FindAsync(ca.IdEmpresa);
                if (em == null) return res.BadRequestResponse(Messages.RecEmpresa.NOTFOUND);
                var un = await db.UmUnidadMedida.FindAsync(ca.IdUnidadMedida);
                if (un == null) return res.BadRequestResponse(Messages.UmUnidadMedida.NOTFOUND);
                // ============== start: update prod_producto_base ==============

                var fecha = DateTime.UtcNow;

                producto.CodBarras = ca.CodBarras;
                producto.CodFabricante = ca.CodFabricante;
                producto.CodInterno = ca.CodInterno;
                producto.Color = ca.Color;
                producto.Comprable = ca.Comprable;
                producto.Configurable = ca.Configurable;
                producto.Descripcion = ca.Descripcion;
                producto.DescripcionCompra = ca.DescripcionCompra;
                producto.DescripcionVenta = ca.DescripcionVenta;
                producto.Empresa = em;
                producto.IdTipoProducto = ca.IdTipoProducto;
                producto.UnidadMedica = un;
                producto.IdUnidadMedCompra = ca.IdUnidadMedCompra;
                producto.Nombre = ca.Nombre;
                producto.Peso = ca.Peso;
                producto.PlazoEntregaCli = ca.PlazoEntregaCli;
                producto.PrecioCosto = ca.PrecioCosto;
                producto.PrecioVenta = ca.PrecioVenta;
                producto.Prioridad = ca.Prioridad;
                producto.Secuencia = ca.Secuencia;
                producto.TipoServEnt = ca.TipoServEnt;
                producto.Trazabilidad = ca.Trazabilidad;
                producto.Vendible = ca.Vendible;
                producto.Volumen = ca.Volumen;
                producto.FechaModificacion = fecha;
                producto.Categoria = categoria;
                // ============== end: update prod_producto_base ==============




                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.ProdProductoBase.UPDATED, CreateRes(producto));
            }).RequireAuthorization().WithTags(tag);

            app.MapDelete(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                var producto = await db.ProdProductoBase
                    .Include(ppb => ppb.ProdProducto)
                        .ThenInclude(pp => pp.ProdProductoAtribValorRel)
                    .Include(ppb => ppb.ProdBaseAtributoValorRel)
                    .FirstOrDefaultAsync(ppb => ppb.Id == id);
                if (producto is null) return res.NotFoundResponse(Messages.ProdCategoria.NOTFOUND);
                db.ProdProductoBase.Remove(producto);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.ProdProductoBase.DELETED, "");
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/atributos/{id}", async (int id, List<List<int>> dto, DBContext db) =>
            {
                var productoBase = await db.ProdProductoBase.Includes().FirstOrDefaultAsync(pc => pc.Id == id);
                if (productoBase == null) return res.NotFoundResponse(Messages.ProdProductoBase.NOTFOUND);

                var idsAtributoValor = dto.SelectMany(list => list.Select(n => n)).ToList();
                productoBase.ProdBaseAtributoValorRel = productoBase.ProdBaseAtributoValorRel
                    .Where(r => idsAtributoValor.Contains(r.IdAtribValor))
                    .ToList();

                var idsAtributoValorActuales = productoBase.ProdBaseAtributoValorRel
                    .Select(r => r.IdAtribValor)
                    .ToList();
                var idsAtributoValorNuevos = idsAtributoValor.Except(idsAtributoValorActuales).ToList();

                foreach (int idAtributoValor in idsAtributoValorNuevos)
                {
                    var atributoValor = await db.ProdAtributoValor.FindAsync(idAtributoValor);
                    if (atributoValor != null)
                    {
                        ProdBaseAtribValorRel rel = new()
                        {
                            AtributoValor = atributoValor,
                            ProductoBase = productoBase,
                            PrecioExtra = 0
                        };
                        productoBase.ProdBaseAtributoValorRel.Add(rel);
                    }
                }

                List<List<int>> combinaciones = GenerarCombinaciones(dto, 0);
                List<ProdProducto> variantes = new();

                var productosConVariantes = db.ProdProducto
                    .Include(pp => pp.ProdProductoAtribValorRel)
                    .IgnoreQueryFilters()
                    .Where(pp => pp.IdProdBase == productoBase.Id && pp.ProdProductoAtribValorRel.Count > 0)
                    .ToList();
                db.ProdProducto.RemoveRange(productosConVariantes);

                foreach (List<int> combinacion in combinaciones)
                {
                    ProdProducto producto = new()
                    {
                        ProdProductoBase = productoBase,
                        CodBarras = productoBase.CodBarras,
                        CodFabricante = productoBase.CodFabricante,
                        CodInterno = productoBase.CodInterno,
                        PathImagen = null,
                        Peso = productoBase.Peso,
                        Volumen = productoBase.Volumen
                    };
                    foreach (int idAtributoValor in combinacion)
                    {
                        var prodBaseAtribValorRel = productoBase
                            .ProdBaseAtributoValorRel
                            .Where(rel => rel.IdAtribValor == idAtributoValor && rel.IdProdBase == productoBase.Id)
                            .FirstOrDefault();
                        if (prodBaseAtribValorRel != null)
                        {
                            ProdProductoAtribValorRel rel = new()
                            {
                                ProdProducto = producto,
                                ProdBaseAtribValorRel = prodBaseAtribValorRel
                            };
                            producto.ProdProductoAtribValorRel.Add(rel);
                        }
                    }
                    variantes.Add(producto);
                }
                db.ProdProducto.AddRange(variantes);

                await db.SaveChangesAsync();

                return res.SuccessResponse(Messages.ProdProductoBase.UPDATED, new
                {
                    count = variantes.Count,
                    combinaciones,
                    producto = CreateRes(productoBase),
                });
            }).RequireAuthorization().WithTags(tag);
        }

        static List<List<int>> GenerarCombinaciones(List<List<int>> arrayDeArrays, int indice)
        {
            List<List<int>> combinaciones = new();

            if (indice == arrayDeArrays.Count - 1)
            {
                foreach (int elemento in arrayDeArrays[indice])
                {
                    combinaciones.Add(new List<int> { elemento });
                }
            }
            else
            {
                List<List<int>> combinacionesRestantes = GenerarCombinaciones(arrayDeArrays, indice + 1);
                foreach (int elemento in arrayDeArrays[indice])
                {
                    foreach (List<int> combinacion in combinacionesRestantes)
                    {
                        List<int> nuevaCombinacion = new() { elemento };
                        nuevaCombinacion.AddRange(combinacion);
                        combinaciones.Add(nuevaCombinacion);
                    }
                }
            }

            return combinaciones;
        }
    }
}