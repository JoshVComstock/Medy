using server.Data;
using server.Models;
using server.Responses;
using server.Utils;
using server.Dtos;
using Microsoft.EntityFrameworkCore;
using server.Constants;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using Microsoft.IdentityModel.Tokens;

namespace server.Endpoints
{
    public static class ProdProductoExt
    {
        public static ProdProductoRes CreateRes(ProdProducto pd)
        {
            return new ProdProductoRes
            {
                Id = pd.Id,
                Nombre = pd.ProdProductoBase.Nombre,
                Descripcion = pd.ProdProductoBase.Descripcion,
                IdUsrCreacion = pd.IdUsrCreacion,
                IdUsrModificacion = pd.IdUsrModificacion,
                Estado = pd.Estado,
                FechaCreacion = pd.FechaCreacion,
                FechaModificacion = pd.FechaModificacion,
                CodBarras = pd.CodInterno,
                CodFabricante = pd.CodFabricante,
                CodInterno = pd.CodInterno,
                PathImagen = pd.PathImagen,
                Volumen = pd.Volumen,
                Peso = pd.Peso,
                Atributos = pd.ProdProductoAtribValorRel.Select(av => new AtributosForProduct
                {
                    IdAtributo = av.ProdBaseAtribValorRel.AtributoValor.IdAtributo,
                    IdAtributoValor = av.ProdBaseAtribValorRel.AtributoValor.Id,
                    Nombre = av.ProdBaseAtribValorRel.AtributoValor.Nombre
                }).ToList()
            };
        }
        public static IQueryable<ProdProducto> Includes(this IQueryable<ProdProducto> query)
        {
            return query
                .Include(p => p.ProdProductoBase)
                .Include(p => p.ProdProductoAtribValorRel)
                    .ThenInclude(ppavr => ppavr.ProdBaseAtribValorRel)
                        .ThenInclude(pbavr => pbavr.AtributoValor);
        }
        public static IQueryable<ProdProductoRes> GetRes(this IQueryable<ProdProducto> query)
        {
            return query.Includes().Select(entity => CreateRes(entity));
        }

        public static void ProdProductoEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Producto";
            string baseUrl = "/producto";
            string uploadDirectory = Path.Combine("Uploads", "Producto");

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var productoProducto = await db.ProdProducto
                .Include(p => p.ProdProductoBase)
                    .ThenInclude(p => p.ProdBaseAtributoValorRel)
                .Include(p => p.ProdProductoAtribValorRel)
                .Where(p =>
                    (p.ProdProductoBase.ProdBaseAtributoValorRel.Count == 0 && p.ProdProductoAtribValorRel.Count == 0) ||
                    (p.ProdProductoBase.ProdBaseAtributoValorRel.Count > 0 && p.ProdProductoAtribValorRel.Count > 0)
                ).GetRes().ToListAsync();
                return res.SuccessResponse(Messages.ProdProducto.GET, productoProducto);
            }).RequireAuthorization().WithTags(tag);


            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var productoProducto = await db.ProdProducto.IgnoreQueryFilters().GetRes().ToListAsync();
                return res.SuccessResponse(Messages.ProdProducto.GET, productoProducto);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                return await db.ProdProducto.Where(ca => ca.Id == id).GetRes().FirstOrDefaultAsync() is ProdProductoRes e
                    ? res.SuccessResponse(Messages.ProdProducto.FIND, e)
                    : res.NotFoundResponse(Messages.ProdProducto.NOTFOUND);
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/{id}", async (int id, DBContext db, [FromForm] IFormFile? pathImagen, HttpContext ctx) =>
            {
                var producto = await db.ProdProducto.Includes().FirstOrDefaultAsync(pc => pc.Id == id);
                if (producto is null) return res.NotFoundResponse(Messages.ProdProducto.NOTFOUND);
                var form = ctx.Request.Form;

                var CodInterno = form["CodInterno"].ToString();
                var CodBarras = form["CodBarras"].ToString();
                var CodFabricante = form["CodFabricante"].ToString();
                var Volumen = form["Volumen"].ToString();
                var Peso = form["Peso"].ToString();

                if (
                    CodInterno == string.Empty ||
                    CodBarras == string.Empty ||
                    CodFabricante == string.Empty ||
                    Volumen == string.Empty ||
                    Peso == string.Empty
                ) return res.BadRequestResponse(Messages.ProdProducto.BADFORM);

                producto.CodInterno = CodInterno;
                producto.CodBarras = CodBarras;
                producto.CodFabricante = CodFabricante;
                producto.Volumen = int.Parse(Volumen);
                producto.Peso = int.Parse(Peso);

                if (pathImagen != null)
                {
                    var fileName = $"Producto{producto.Id}.png";
                    var imagePath = Path.Combine(uploadDirectory, fileName);
                    Directory.CreateDirectory(uploadDirectory);
                    using (var fileStream = new FileStream(imagePath, FileMode.Create))
                    {
                        await pathImagen.CopyToAsync(fileStream);
                    }
                    producto.PathImagen = fileName;
                }

                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.ProdProducto.UPDATED, CreateRes(producto));
            }).RequireAuthorization().WithTags(tag);
        }
    }
}