using server.Data;
using server.Models;
using server.Responses;
using server.Utils;
using server.Dtos;
using Microsoft.EntityFrameworkCore;
using server.Constants;

namespace server.Endpoints
{
    public static class RecGrupoExt
    {
        public static RecGrupoRes CreateRes(RecGrupo rg)
        {
            return new RecGrupoRes
            {
                Id = rg.Id,
                FechaCreacion = rg.FechaCreacion,
                FechaModificacion = rg.FechaModificacion,
                IdUsrCreacion = rg.IdUsrCreacion,
                IdUsrModificacion = rg.IdUsrModificacion,
                Nombre = rg.Nombre,
                Descripcion = rg.Descripcion,
                IdCategoria = rg.IdCategoria,
                Estado = rg.Estado,
                Menus = rg.RiMenuGrupoRel.Select(r => r.Menu).AsQueryable().GetRes().ToList(),
                Accesos = rg.RiAccesoModelo.AsQueryable().GetRes().ToList()
            };
        }
        public static IQueryable<RecGrupo> Includes(this IQueryable<RecGrupo> query)
        {
            return query
                .Include(rg => rg.RiAccesoModelo)
                    .ThenInclude(rg => rg.Modelo)
                .Include(rg => rg.RiMenuGrupoRel)
                    .ThenInclude(rmgr => rmgr.Menu);
        }
        public static IQueryable<RecGrupoRes> GetRes(this IQueryable<RecGrupo> query)
        {
            return query.Includes().Select(entity => CreateRes(entity));
        }

        public static void RecGrupoEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Grupo";
            string baseUrl = "/recGrupo";

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var Grupo = await db.RecGrupo.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.RecGrupo.GET, Grupo);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var Grupo = await db.RecGrupo.IgnoreQueryFilters().GetRes().ToListAsync();
                return res.SuccessResponse(Messages.RecGrupo.GET, Grupo);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                return await db.RecGrupo.Where(ca => ca.Id == id).GetRes().FirstOrDefaultAsync() is RecGrupoRes e
                    ? res.SuccessResponse(Messages.RecGrupo.FIND, e)
                    : res.NotFoundResponse(Messages.RecGrupo.NOTFOUND);
            }).RequireAuthorization().WithTags(tag);

            app.MapPost(baseUrl, async (RecGrupoDTO ca, DBContext db) =>
            {
                var exit = await db.RecGrupo.AnyAsync(e => e.Nombre == ca.Nombre);
                if (exit) return res.BadRequestResponse(Messages.RecGrupo.EXISTS);
                RecGrupo grupo = new()
                {
                    Nombre = ca.Nombre,
                    Descripcion = ca.Descripcion,
                    IdCategoria = ca.IdCategoria
                };
                db.RecGrupo.Add(grupo);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.RecGrupo.CREATED, CreateRes(grupo));
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/{id}", async (int id, RecGrupoDTO ca, DBContext db) =>
            {
                var exit = await db.RecGrupo.AnyAsync(e => e.Nombre == ca.Nombre && e.Id != id);
                if (exit) return res.BadRequestResponse(Messages.RecGrupo.EXISTS);
                var grupo = await db.RecGrupo.Includes().FirstOrDefaultAsync(r => r.Id == id);
                if (grupo is null) return res.NotFoundResponse(Messages.RecGrupo.NOTFOUND);

                grupo.Nombre = ca.Nombre;
                grupo.Descripcion = ca.Descripcion;
                grupo.IdCategoria = ca.IdCategoria;

                await db.SaveChangesAsync();

                return res.SuccessResponse(Messages.RecGrupo.UPDATED, CreateRes(grupo));
            }).RequireAuthorization().WithTags(tag);

            app.MapDelete(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                var grupo = await db.RecGrupo.Include(r => r.RiMenuGrupoRel).FirstOrDefaultAsync(r => r.Id == id);
                if (grupo is null) return res.NotFoundResponse(Messages.RecGrupo.NOTFOUND);
                db.RecGrupo.Remove(grupo);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.RecGrupo.DELETED, "");
            }).RequireAuthorization().WithTags(tag);


            app.MapPut(baseUrl + "/accesos/{id}", async (int id, DBContext db, List<MenuAccesoDTO> ca) =>
            {
                var grupo = await db.RecGrupo
                    .Includes()
                    .Include(rg => rg.RecUsuarioGrupo)
                        .ThenInclude(rug => rug.Usuario)
                    .FirstOrDefaultAsync(r => r.Id == id);
                if (grupo is null) return res.NotFoundResponse(Messages.RecGrupo.NOTFOUND);

                var idsMenu = ca.Select(r => r.IdMenu).ToList();
                grupo.RiMenuGrupoRel = grupo.RiMenuGrupoRel
                    .Where(r => idsMenu.Contains(r.IdMenu))
                    .ToList();

                var menuActuales = grupo.RiMenuGrupoRel
                    .Select(r => r.IdMenu)
                    .ToList();
                var nuevosMenus = idsMenu.Except(menuActuales).ToList();

                foreach (int idMenu in nuevosMenus)
                {
                    var menu = await db.RiMenu.FindAsync(idMenu);
                    if (menu != null)
                    {
                        RiMenuGrupoRel relacion = new()
                        {
                            Grupo = grupo,
                            Menu = menu
                        };
                        grupo.RiMenuGrupoRel.Add(relacion);
                    }
                }

                var accesos = ca.SelectMany(r => r.Accesos).ToList();
                grupo.RiAccesoModelo = grupo.RiAccesoModelo
                    .Where(r => accesos.Select(a => a.IdModelo).Contains(r.IdModelo))
                    .ToList();

                var accesosActuales = grupo.RiAccesoModelo
                    .Select(r => r.IdModelo)
                    .ToList();
                var existentes = accesos.Where(a => accesosActuales.Contains(a.IdModelo)).ToList();
                var nuevoAccesos = accesos.Where(a => !accesosActuales.Contains(a.IdModelo)).ToList();

                foreach (var acceso in existentes)
                {
                    var a = grupo.RiAccesoModelo.Where(a => a.IdModelo == acceso.IdModelo).FirstOrDefault();
                    if (a != null)
                    {
                        a.Crear = acceso.Agregar;
                        a.Editar = acceso.Editar;
                        a.Ver = acceso.Ver;
                        a.Eliminar = acceso.Eliminar;
                        a.FechaModificacion = DateTime.UtcNow;
                    }
                }

                foreach (var acceso in nuevoAccesos)
                {
                    var modelo = await db.RiModelo.FindAsync(acceso.IdModelo);
                    if (modelo != null)
                    {
                        var accesoModelo = new RiAccesoModelo
                        {
                            Grupo = grupo,
                            Ver = acceso.Ver,
                            Crear = acceso.Agregar,
                            Editar = acceso.Editar,
                            Eliminar = acceso.Eliminar,
                            FechaCreacion = DateTime.UtcNow,
                            FechaModificacion = DateTime.UtcNow,
                            Modelo = modelo
                        };
                        grupo.RiAccesoModelo.Add(accesoModelo);
                    }
                }

                await db.SaveChangesAsync();

                var users = grupo.RecUsuarioGrupo.Select(r => r.Usuario).ToList();
                foreach (var user in users)
                {
                    await WSManager.BroadcastOne(user.Id, new IResponseSocket
                    {
                        Data = "",
                        Message = "Tus accesos han cambiado",
                        Type = Sockets.Types.USERGROUP
                    });
                }

                return res.SuccessResponse(Messages.RecGrupo.UPDATED, CreateRes(grupo));
            }).RequireAuthorization().WithTags(tag);
        }
    }
}