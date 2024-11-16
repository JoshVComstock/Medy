using server.Utils;
using server.Dtos;
using Microsoft.EntityFrameworkCore;
using server.Constants;
using server.Data;
using server.Responses;
using server.Models;

namespace server.Endpoints
{
    public static class RecContactoExt
    {
        public static RecContactoRes CreateRes(RecContacto rc)
        {
            return new RecContactoRes
            {
                Id = rc.Id,
                IdEmpresa = rc.IdEmpresa,
                IdPadre = rc.IdPadre,
                Latitud = rc.Latitud,
                Longitud = rc.Longitud,
                Numeracion = rc.Numeracion,
                TipoContacto = rc.TipoContacto,
                Zona = rc.Zona,
                Nombre = rc.Nombre,
                Profesion = rc.Profesion,
                NombreDespliegue = rc.NombreDespliegue,
                IdentFiscal = rc.IdentFiscal,
                IdPais = rc.IdPais,
                IdCiudad = rc.IdCiudad,
                EsEmpresa = rc.EsEmpresa,
                Direccion1 = rc.Direccion1,
                Direccion2 = rc.Direccion2,
                TelefonoFijo = rc.TelefonoFijo,
                TelefonoMovil = rc.TelefonoMovil,
                PuestoTrabajo = rc.PuestoTrabajo,
                Email = rc.Email,
                SitioWeb = rc.SitioWeb,
                Comentario = rc.Comentario,
                Color = rc.Color,
                FechaCreacion = rc.FechaCreacion,
                FechaModificacion = rc.FechaModificacion,
                IdUsrCreacion = rc.IdUsrCreacion,
                IdUsrModificacion = rc.IdUsrModificacion,
                Estado = rc.Estado,
                Categorias = rc.ContactoCategoriaRel.Select(r => r.ContactoCategoria).AsQueryable().GetRes().ToList()
            };
        }
        public static IQueryable<RecContacto> Includes(this IQueryable<RecContacto> query)
        {
            return query
            .Include(rc => rc.ContactoCategoriaRel)
            .ThenInclude(ccr => ccr.ContactoCategoria);
        }
        public static IQueryable<RecContactoRes> GetRes(this IQueryable<RecContacto> query)
        {
            return query.Includes().Select(entity => CreateRes(entity));
        }

        public static void RecContactoEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Contacto";
            string baseUrl = "/recContacto";

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var Contacto = await db.RecContacto.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.RecContacto.GET, Contacto);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var Contacto = await db.RecContacto.IgnoreQueryFilters().GetRes().ToListAsync();
                return res.SuccessResponse(Messages.RecContacto.GET, Contacto);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                return await db.RecContacto.Where(ca => ca.Id == id).GetRes().FirstOrDefaultAsync() is RecContactoRes e
                    ? res.SuccessResponse(Messages.RecContacto.FIND, e)
                    : res.NotFoundResponse(Messages.RecContacto.NOTFOUND);
            }).RequireAuthorization().WithTags(tag);
            app.MapGet(baseUrl + "/contactos/{id}", async (int id, DBContext db) =>
            {
                var contactos = await db.RecContacto.Where(ca => ca.IdPadre == id).GetRes().ToListAsync();
                return res.SuccessResponse(Messages.RecContacto.FIND, contactos);

            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/esEmpresa", async (DBContext db) =>
            {
                var contactos = await db.RecContacto.Where(ca =>ca.IdPadre==null).GetRes().ToListAsync();
                return res.SuccessResponse(Messages.RecContacto.FIND, contactos);

            }).RequireAuthorization().WithTags(tag);

            app.MapPost(baseUrl, async (RecContactoDTO ca, DBContext db) =>
            {
                var exit = await db.RecContacto.AnyAsync(e => e.Nombre == ca.Nombre);
                if (exit) return res.BadRequestResponse(Messages.RecContacto.EXISTS);
           

                RecContacto contacto = new()
                {
                    Nombre = ca.Nombre,
                    Profesion = ca.Profesion,
                    NombreDespliegue = ca.NombreDespliegue,
                    IdentFiscal = ca.IdentFiscal,
                    IdPais = ca.IdPais,
                    IdCiudad = ca.IdCiudad,
                    EsEmpresa = ca.EsEmpresa,
                    Direccion1 = ca.Direccion1,
                    Direccion2 = ca.Direccion2,
                    TelefonoFijo = ca.TelefonoFijo,
                    TelefonoMovil = ca.TelefonoMovil,
                    PuestoTrabajo = ca.PuestoTrabajo,
                    Email = ca.Email,
                    SitioWeb = ca.SitioWeb,
                    Comentario = ca.Comentario,
                    Color = ca.Color,
                    IdPadre = ca.IdPadre,
                    Latitud = ca.Latitud,
                    Longitud = ca.Longitud,
                    Numeracion = ca.Numeracion,
                    TipoContacto = ca.TipoContacto,
      
                    Zona = ca.Zona
                };

                foreach (int idCategoria in ca.IdsCategContacto)
                {
                    var categoria = await db.RecContactoCategoria.FindAsync(idCategoria);
                    if (categoria != null)
                    {
                        RecContactoCategoriaRel relacion = new()
                        {
                            Contacto = contacto,
                            ContactoCategoria = categoria
                        };
                        contacto.ContactoCategoriaRel.Add(relacion);
                    }
                }

                db.RecContacto.Add(contacto);
                await db.SaveChangesAsync();

                return res.SuccessResponse(Messages.RecContacto.CREATED, CreateRes(contacto));
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/{id}", async (int id, RecContactoDTO ca, DBContext db) =>
            {
                var exit = await db.RecContacto.AnyAsync(e => e.Nombre == ca.Nombre && e.Id != id);
                if (exit) return res.BadRequestResponse(Messages.RecContacto.EXISTS);
                var contacto = await db.RecContacto.Includes().FirstOrDefaultAsync(c => c.Id == id);
                if (contacto is null) return res.NotFoundResponse(Messages.RecContacto.NOTFOUND);

                contacto.Nombre = ca.Nombre;
                contacto.Profesion = ca.Profesion;
                contacto.NombreDespliegue = ca.NombreDespliegue;
                contacto.IdentFiscal = ca.IdentFiscal;
                contacto.IdPais = ca.IdPais;
                contacto.IdCiudad = ca.IdCiudad;
                contacto.EsEmpresa = ca.EsEmpresa;
                contacto.Direccion1 = ca.Direccion1;
                contacto.Direccion2 = ca.Direccion2;
                contacto.TelefonoFijo = ca.TelefonoFijo;
                contacto.TelefonoMovil = ca.TelefonoMovil;
                contacto.PuestoTrabajo = ca.PuestoTrabajo;
                contacto.Email = ca.Email;
                contacto.SitioWeb = ca.SitioWeb;
                contacto.Comentario = ca.Comentario;
                contacto.Color = ca.Color;
                contacto.IdPadre = ca.IdPadre;

                var categoriasActuales = contacto.ContactoCategoriaRel
                    .Select(r => r.IdCategContacto)
                    .ToList();
                var nuevasCategorias = ca.IdsCategContacto.Except(categoriasActuales).ToList();

                foreach (int idCategoria in nuevasCategorias)
                {
                    var categoria = await db.RecContactoCategoria.FindAsync(idCategoria);
                    if (categoria != null)
                    {
                        RecContactoCategoriaRel relacion = new()
                        {
                            Contacto = contacto,
                            ContactoCategoria = categoria
                        };
                        contacto.ContactoCategoriaRel.Add(relacion);
                    }
                }

                var relacionesEliminar = db.RecContactoCategoriaRel
                    .Where(r => r.IdContacto == contacto.Id && !ca.IdsCategContacto.Contains(r.IdCategContacto))
                    .ToList();
                db.RecContactoCategoriaRel.RemoveRange(relacionesEliminar);

                await db.SaveChangesAsync();

                return res.SuccessResponse(Messages.RecContacto.UPDATED, CreateRes(contacto));
            }).RequireAuthorization().WithTags(tag);

            app.MapDelete(baseUrl + "/{id}", async (int id, DBContext db) =>
                {
                    var contacto = await db.RecContacto.Include(c => c.ContactoCategoriaRel).FirstOrDefaultAsync(c => c.Id == id);
                    if (contacto is null) return res.NotFoundResponse(Messages.RecContacto.NOTFOUND);
                    db.RecContacto.Remove(contacto);
                    await db.SaveChangesAsync();
                    return res.SuccessResponse(Messages.RecContacto.DELETED, "");
                }).RequireAuthorization().WithTags(tag);
        }
    }
}