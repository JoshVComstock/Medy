using server.Data;
using server.Models;
using server.Responses;
using server.Utils;
using server.Dtos;
using Microsoft.EntityFrameworkCore;
using server.Constants;
using System.Security.Claims;

namespace server.Endpoints
{
    public static class RiMenuExt
    {
        public static RiMenuRes CreateRes(RiMenu rm)
        {
            return new RiMenuRes
            {
                Id = rm.Id,
                FechaCreacion = rm.FechaCreacion,
                FechaModificacion = rm.FechaModificacion,
                Nombre = rm.Nombre,
                Accion = rm.Accion,
                IdPadre = rm.IdPadre,
                NombrePadre = rm.Padre?.Nombre,
                PathIcono = rm.PathIcono,
                PathPadre = rm.PathPadre,
                Secuencia = rm.Secuencia,
                Estado = rm.Estado,
                Modelos = rm.RiModelo.AsQueryable().GetRes().ToList(),
                IdUsrCreacion = rm.IdUsrModificacion,
                IdUsrModificacion = rm.IdUsrModificacion,
            };
        }
        public static IQueryable<RiMenu> Includes(this IQueryable<RiMenu> query)
        {
            return query.Include(rm => rm.Padre).Include(rm => rm.RiModelo);
        }
        public static IQueryable<RiMenuRes> GetRes(this IQueryable<RiMenu> query)
        {
            return query.Includes().Select(entity => CreateRes(entity));
        }

        public static void RiMenuEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Menu";
            string baseUrl = "/riMenu";

            app.MapGet(baseUrl + "/dashboard", async (DBContext db, ClaimsPrincipal User) =>
            {
                var tokenId = User.FindFirst("Id")?.Value;
                if (tokenId == null) return res.BadRequestResponse(Messages.Auth.ERRORTOKEN);
                int id = int.Parse(tokenId);
                var user = await db.RecUsuario
                    .Include(ru => ru.RecUsuarioGrupo)
                        .ThenInclude(rug => rug.Grupo)
                        .ThenInclude(g => g.RiMenuGrupoRel)
                        .ThenInclude(rmgr => rmgr.Menu)
                    .Include(ru => ru.RecUsuarioGrupo)
                        .ThenInclude(rug => rug.Grupo)
                        .ThenInclude(g => g.RiAccesoModelo)
                    .FirstOrDefaultAsync(ru => ru.Id == id);
                if (user == null) return res.BadRequestResponse(Messages.RecUsuario.NOTFOUND);

                var menuIds = user.RecUsuarioGrupo
                    .Select(rug => rug.Grupo.RiMenuGrupoRel.Select(rmgr => rmgr.Menu.Id))
                    .SelectMany(ids => ids)
                    .ToList();
                var menus = await db.RiMenu
                    .OrderBy(m => m.Secuencia)
                    .Where(m => m.IdPadre == null && menuIds.Contains(m.Id))
                    .ToListAsync();
                var links = new List<ParentLink>();
                foreach (var m in menus)
                {
                    var childs = await RecursiveGetLinks(db, menuIds, m);
                    var link = new ParentLink
                    {
                        Id = m.Id,
                        Nombre = m.Nombre,
                        Icon = m.PathIcono,
                        Hijos = childs
                    };
                    links.Add(link);
                }

                var accesoIds = user.RecUsuarioGrupo
                    .SelectMany(rug => rug.Grupo.RiAccesoModelo.Select(ram => ram.Id))
                    .ToList();
                var accesos = await db.RiAccesoModelo
                    .Where(ram => accesoIds.Contains(ram.Id))
                    .GetRes()
                    .ToListAsync();

                return res.SuccessResponse("Dashboard obtenido correctamente", new
                {
                    Menus = links,
                    Accesos = accesos
                });
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var menus = await RecursiveGetMenus(db, null);
                return res.SuccessResponse(Messages.RiMenu.GET, menus);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var Menu = await db.RiMenu.IgnoreQueryFilters().GetRes().ToListAsync();
                return res.SuccessResponse(Messages.RiMenu.GET, Menu);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                return await db.RiMenu.Where(ca => ca.Id == id).GetRes().FirstOrDefaultAsync() is RiMenuRes e
                    ? res.SuccessResponse(Messages.RiMenu.FIND, e)
                    : res.NotFoundResponse(Messages.RiMenu.NOTFOUND);
            }).RequireAuthorization().WithTags(tag);

            app.MapPost(baseUrl, async (RiMenuDTO ca, DBContext db) =>
            {
                var fecha = DateTime.UtcNow;
                var exit = await db.RiMenu.AnyAsync(e => e.Nombre == ca.Nombre);
                if (exit) return res.BadRequestResponse(Messages.RiMenu.EXISTS);
                RiMenu? padre = null;
                int? idPadre = ToNullableInt(ca.IdPadre);
                if (idPadre != null)
                {
                    padre = await db.RiMenu.FirstOrDefaultAsync(rm => rm.Id == idPadre);
                    if (padre == null) return res.NotFoundResponse(Messages.RiMenu.NOTPADRE);
                }
                RiMenu menu = new()
                {
                    Nombre = ca.Nombre,
                    Accion = ca.Accion,
                    PathIcono = ca.PathIcono,
                    PathPadre = ca.PathPadre,
                    Secuencia = ca.Secuencia,
                    Padre = padre
                };
                db.RiMenu.Add(menu);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.RiMenu.CREATED, CreateRes(menu));
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/{id}", async (int id, RiMenuDTO ca, DBContext db) =>
            {
                var menu = await db.RiMenu.Includes().FirstOrDefaultAsync(rm => rm.Id == id);
                if (menu is null) return res.NotFoundResponse(Messages.RiMenu.NOTFOUND);
                RiMenu? padre = null;
                if (ToNullableInt(ca.IdPadre) != null)
                {
                    padre = await db.RiMenu.FirstOrDefaultAsync(rm => rm.Id == ToNullableInt(ca.IdPadre));
                    if (padre == null) return res.NotFoundResponse(Messages.RiMenu.NOTPADRE);
                }
                menu.Nombre = ca.Nombre;
                menu.PathPadre = ca.PathPadre;
                menu.PathIcono = ca.PathIcono;
                menu.Accion = ca.Accion;
                menu.Secuencia = ca.Secuencia;
                menu.Padre = padre;

                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.RiMenu.UPDATED, CreateRes(menu));
            }).RequireAuthorization().WithTags(tag);

            app.MapDelete(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                var menu = await db.RiMenu.Include(m => m.RiMenuGrupoRel).FirstOrDefaultAsync(m => m.Id == id);
                if (menu is null) return res.NotFoundResponse(Messages.RiMenu.NOTFOUND);
                db.RiMenu.Remove(menu);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.RiMenu.DELETED, "");
            }).RequireAuthorization().WithTags(tag);
        }

        private static async Task<List<RiMenuRes>> RecursiveGetMenus(DBContext db, int? padre)
        {
            var menus = await db.RiMenu.OrderBy(m => m.Secuencia).Where(m => m.IdPadre == padre).GetRes().ToListAsync();
            var list = new List<RiMenuRes>();
            if (menus.Count == 0)
            {
                return list;
            }
            foreach (var menu in menus)
            {
                var childs = await RecursiveGetMenus(db, menu.Id);
                list.Add(menu);
                list.AddRange(childs);
            }
            return list;
        }

        private static async Task<List<ChildLink>> RecursiveGetLinks(DBContext db, List<int> menuIds, RiMenu menu)
        {
            var menus = await db.RiMenu
                .Where(m => m.IdPadre == menu.Id && menuIds.Contains(m.Id))
                .Include(m => m.Padre)
                .OrderBy(m => m.Secuencia)
                .ToListAsync();
            var links = new List<ChildLink>();
            if (menus.Count == 0)
            {
                return links;
            }
            foreach (var m in menus)
            {
                var childs = await RecursiveGetLinks(db, menuIds, m);
                var link = new ChildLink
                {
                    Id = m.Id,
                    Padre = m.Padre?.Nombre ?? "",
                    Nombre = m.Nombre,
                    Accion = m.Accion,
                    Hijos = childs
                };
                links.Add(link);
            }
            return links;
        }
        public static int? ToNullableInt(this string s)
        {
            if (int.TryParse(s, out int i)) return i;
            return null;
        }
    }
}