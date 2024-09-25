using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Responses;
using server.Utils;
using server.Dtos;
using server.Constants;

namespace server.Endpoints
{
    public static class RecEmpresaExt
    {
        public static RecEmpresaRes CreateRes(RecEmpresa em)
        {
            return new RecEmpresaRes
            {
                Id = em.Id,
                Contacto = RecContactoExt.CreateRes(em.Contacto),
                Moneda = RecMonedaExt.CreateMonedaRes(em.Moneda),
                IdPadre = em.IdPadre,
                Nombre = em.Nombre,
                EmpresaDetalles = em.EmpresaDetalles,
                Secuencia = em.Secuencia,
                Email = em.Email,
                TelefonoFijo = em.TelefonoFijo,
                TelefonoMovil = em.TelefonoMovil,
                FuenteLetra = em.FuenteLetra,
                ColorPrimario = em.ColorPrimario,
                ColorSecundario = em.ColorSecundario,
                ColorBackground = em.ColorBackground,
                PieInforme = em.PieInforme,
                CabeceraInforme = em.CabeceraInforme,
                PathLogo = em.PathLogo,
                IdNomenclatura = em.IdNomenclatura,
                CodigoQR = em.CodigoQR,
                Estado = em.Estado,
                FechaCreacion = em.FechaCreacion,
                FechaModificacion = em.FechaModificacion,
                IdUsrCreacion = em.IdUsrCreacion,
                IdUsrModificacion = em.IdUsrModificacion,
            };
        }
        public static RecEmpresaInfoRes CreateEmpresaInfoRes(RecEmpresa em)
        {
            return new RecEmpresaInfoRes
            {
                Nombre = em.Nombre,
                Email = em.Email,
                TelefonoFijo = em.TelefonoFijo,
                TelefonoMovil = em.TelefonoMovil,
                CodigoQR = em.CodigoQR,
            };
        }

        public static IQueryable<RecEmpresa> Includes(this IQueryable<RecEmpresa> query)
        {
            return query
            .Include(e => e.Contacto)
            .Include(e => e.Moneda);
        }

        public static IQueryable<RecEmpresaRes> GetRes(this IQueryable<RecEmpresa> query)
        {
            return query.Includes().Select(entity => CreateRes(entity));
        }

        public static void RecEmpresaEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Empresa";
            string baseUrl = "/recEmpresa";

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var empresas = await db.RecEmpresa.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.RecEmpresa.GET, empresas);
            }).RequireAuthorization().WithTags(tag);
            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var empresa = await db.RecEmpresa.IgnoreQueryFilters().Select(pa => CreateRes(pa)).ToListAsync();
                return res.SuccessResponse(Messages.RecEmpresa.GET, empresa);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id:int}", async (int id, DBContext db) =>
            {
                var empresa = await db.RecEmpresa.Where(e => e.Id == id).GetRes().FirstOrDefaultAsync();
                return empresa != null
                    ? res.SuccessResponse(Messages.RecEmpresa.FIND, empresa)
                    : res.NotFoundResponse(Messages.RecEmpresa.NOTFOUND);
            }).RequireAuthorization().WithTags(tag);

            app.MapPost(baseUrl, async (RecEmpresaDTO rec, DBContext db) =>
            {
                var exit = await db.RecEmpresa.AnyAsync(e => e.Nombre == rec.Nombre);
                if (exit) return res.BadRequestResponse(Messages.RecEmpresa.EXISTS);
                var cm = await db.RecContacto.FindAsync(rec.IdContacto);
                if (cm is null) return res.NotFoundResponse(Messages.RecEmpresa.NOTCONTACTO);
                var mon = await db.RecMoneda.FindAsync(rec.IdMoneda);
                if (mon is null) return res.NotFoundResponse(Messages.RecEmpresa.NOTMONEDA);
                var recEmpresa = new RecEmpresa
                {
                    Moneda = mon,
                    IdPadre = rec.IdPadre,
                    Nombre = rec.Nombre,
                    EmpresaDetalles = rec.EmpresaDetalles,
                    Secuencia = rec.Secuencia,
                    Email = rec.Email,
                    TelefonoFijo = rec.TelefonoFijo,
                    TelefonoMovil = rec.TelefonoMovil,
                    FuenteLetra = rec.FuenteLetra,
                    ColorPrimario = rec.ColorPrimario,
                    ColorSecundario = rec.ColorSecundario,
                    ColorBackground = rec.ColorBackground,
                    PieInforme = rec.PieInforme,
                    CabeceraInforme = rec.CabeceraInforme,
                    PathLogo = rec.PathLogo,
                    IdNomenclatura = rec.IdNomenclatura,
                    CodigoQR = rec.CodigoQR,
                    Contacto = cm,
                };

                db.RecEmpresa.Add(recEmpresa);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.RecEmpresa.CREATED, CreateRes(recEmpresa));
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/{id:int}", async (int id, RecEmpresaDTO recEmpresaDto, DBContext db) =>
            {
                var cm = await db.RecContacto.FindAsync(recEmpresaDto.IdContacto);
                if (cm is null) return res.NotFoundResponse(Messages.RecEmpresa.NOTCONTACTO);
                var recEmpresa = await db.RecEmpresa.FindAsync(id);
                if (recEmpresa == null)
                    return res.NotFoundResponse(Messages.RecEmpresa.NOTFOUND);
                recEmpresa.IdContacto = recEmpresaDto.IdContacto;
                recEmpresa.IdMoneda = recEmpresaDto.IdMoneda;
                recEmpresa.IdPadre = recEmpresaDto.IdPadre;
                recEmpresa.Nombre = recEmpresaDto.Nombre;
                recEmpresa.EmpresaDetalles = recEmpresaDto.EmpresaDetalles;
                recEmpresa.Secuencia = recEmpresaDto.Secuencia;
                recEmpresa.Email = recEmpresaDto.Email;
                recEmpresa.TelefonoFijo = recEmpresaDto.TelefonoFijo;
                recEmpresa.TelefonoMovil = recEmpresaDto.TelefonoMovil;
                recEmpresa.FuenteLetra = recEmpresaDto.FuenteLetra;
                recEmpresa.ColorPrimario = recEmpresaDto.ColorPrimario;
                recEmpresa.ColorSecundario = recEmpresaDto.ColorSecundario;
                recEmpresa.ColorBackground = recEmpresaDto.ColorBackground;
                recEmpresa.PieInforme = recEmpresaDto.PieInforme;
                recEmpresa.CabeceraInforme = recEmpresaDto.CabeceraInforme;
                recEmpresa.PathLogo = recEmpresaDto.PathLogo;
                recEmpresa.IdNomenclatura = recEmpresaDto.IdNomenclatura;
                recEmpresa.CodigoQR = recEmpresaDto.CodigoQR;
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.RecEmpresa.UPDATED, CreateRes(recEmpresa));
            }).RequireAuthorization().WithTags(tag);

            app.MapDelete(baseUrl + "/{id:int}", async (int id, DBContext db) =>
            {
                var recEmpresa = await db.RecEmpresa.FindAsync(id);
                if (recEmpresa == null)
                    return res.NotFoundResponse(Messages.RecEmpresa.NOTFOUND);

                db.RecEmpresa.Remove(recEmpresa);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.RecEmpresa.DELETED, "");
            }).RequireAuthorization().WithTags(tag);
        }
    }
}
