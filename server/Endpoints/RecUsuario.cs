using server.Utils;
using server.Dtos;
using Microsoft.EntityFrameworkCore;
using server.Constants;
using server.Data;
using server.Responses;
using server.Models;

namespace server.Endpoints
{
    public static class RecUsuarioExt
    {
        public static RecUsuarioRes CreateRes(RecUsuario ru)
        {
            return new RecUsuarioRes
            {
                Id = ru.Id,
                IdContacto = ru.IdContacto,
                // IdEmpresa=ru.IdEmpresa,
                NombreContacto = ru.Contacto?.Nombre ?? "",
                IdTipoUsuario = ru.IdTipoUsuario ?? 0,
                NombreTipoUsuario = ru.TipoUsuario?.Descripcion ?? "",
                IdAccion = ru.IdAccion,
                Telefono = ru.Telefono,
                Login = ru.Login,
                Password = ru.Password,
                CodigoSecreto = ru.CodigoSecreto,
                Firma = ru.Firma,
                Notificacion = ru.Notificacion,
                EstadoBot = ru.EstadoBot,
                CodigoBot = ru.CodigoBot,
                Activo = ru.Activo,
                IdUsrCreacion = ru.IdUsrCreacion,
                IdUsrModificacion = ru.IdUsrModificacion,
                Estado = ru.Estado,
                FechaCreacion = ru.FechaCreacion,
                FechaModificacion = ru.FechaModificacion,
                Grupos = ru.RecUsuarioGrupo.Select(r => r.Grupo).AsQueryable().GetRes().ToList()
            };
        }
        public static IQueryable<RecUsuario> Includes(this IQueryable<RecUsuario> query)
        {
            return query
                    .Include(ru => ru.RecUsuarioGrupo)
                    .ThenInclude(rug => rug.Grupo);
        }
        public static IQueryable<RecUsuarioRes> GetRes(this IQueryable<RecUsuario> query)
        {
            return query.Includes().Select(entity => CreateRes(entity));
        }


        public static void RecUsuarioEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Usuario";
            string baseUrl = "/recUsuario";

            app.MapGet(baseUrl, async (DBContext db) =>
            {
                var Usuario = await db.RecUsuario.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.RecContacto.GET, Usuario);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/all", async (DBContext db) =>
            {
                var Usuario = await db.RecUsuario.GetRes().ToListAsync();
                return res.SuccessResponse(Messages.RecUsuario.GET, Usuario);
            }).RequireAuthorization().WithTags(tag);

            app.MapGet(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                return await db.RecUsuario.Where(ca => ca.Id == id).GetRes().FirstOrDefaultAsync() is RecUsuarioRes e
                    ? res.SuccessResponse(Messages.RecUsuario.FIND, e)
                    : res.NotFoundResponse(Messages.RecUsuario.NOTFOUND);
            }).RequireAuthorization().WithTags(tag);

            app.MapPost(baseUrl, async (RecUsuarioDTO ca, DBContext db) =>
            {

                var exit = await db.RecUsuario.AnyAsync(e => e.Login == ca.Login);
                if (exit) return res.BadRequestResponse(Messages.RecUsuario.EXISTS);
                var cav = await db.RecTipoUsuario.FindAsync(ca.IdTipoUsuario);
                if (cav is null) return res.NotFoundResponse(Messages.RecUsuario.NOTTIPOUSUARIO);
                var cm = await db.RecContacto.FindAsync(ca.IdContacto);
                if (cm is null) return res.NotFoundResponse(Messages.RecUsuario.NOTCONTACTO);
                // var em = await db.RecEmpresa.FindAsync(ca.IdEmpresa);
                // if (em is null) return res.NotFoundResponse(Messages.RecEmpresa.NOTFOUND);
                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(ca.Password);
                RecUsuario usuario = new()
                {
                    Contacto = cm,
                    TipoUsuario = cav,
                    IdAccion = ca.IdAccion,
                    Telefono = ca.Telefono,
                    Login = ca.Login,
                    Password = hashedPassword,
                    CodigoSecreto = ca.CodigoSecreto,
                    Firma = ca.Firma,
                    Notificacion = ca.Notificacion,
                    Activo = ca.Activo,
                    CodigoBot = ca.CodigoBot,
                    EstadoBot = ca.EstadoBot,
                    // Empresa = em
                };

                db.RecUsuario.Add(usuario);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.RecContacto.CREATED, CreateRes(usuario));
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/{id}", async (int id, RecUsuarioDTO ca, DBContext db) =>
            {
                var exit = await db.RecUsuario.AnyAsync(e => e.Login == ca.Login && e.Id != id);
                if (exit) return res.BadRequestResponse(Messages.RecUsuario.EXISTS);
                var usuario = await db.RecUsuario.Includes().FirstOrDefaultAsync(c => c.Id == id);
                if (usuario is null) return res.NotFoundResponse(Messages.RecUsuario.NOTFOUND);
                // var em = await db.RecEmpresa.FindAsync(ca.IdEmpresa);
                // if (em is null) return res.NotFoundResponse(Messages.RecEmpresa.NOTFOUND);
                var cm = await db.RecContacto.FindAsync(ca.IdContacto);
                if (cm is null) return res.NotFoundResponse(Messages.RecUsuario.NOTCONTACTO);

                // usuario.Empresa = em;
                usuario.Contacto = cm;
                usuario.IdTipoUsuario = ca.IdTipoUsuario;
                usuario.IdAccion = ca.IdAccion;
                usuario.Telefono = ca.Telefono;
                usuario.Login = ca.Login;
                usuario.Password = ca.Password;
                usuario.CodigoSecreto = ca.CodigoSecreto;
                usuario.Firma = ca.Firma;
                usuario.Notificacion = ca.Notificacion;
                usuario.Activo = ca.Activo;
                usuario.CodigoBot = ca.CodigoBot;
                usuario.EstadoBot = ca.EstadoBot;

                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.RecUsuario.UPDATED, CreateRes(usuario));
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/grupos/{id}", async (int id, RecUsuarioGruposDTO dto, DBContext db) =>
            {
                var usuario = await db.RecUsuario.Includes().FirstOrDefaultAsync(c => c.Id == id);
                if (usuario is null) return res.NotFoundResponse(Messages.RecUsuario.NOTFOUND);

                usuario.RecUsuarioGrupo = usuario.RecUsuarioGrupo
                  .Where(r => dto.Idsgrupo.Contains(r.IdGrupo))
                  .ToList();

                var grupoActuales = usuario.RecUsuarioGrupo
                    .Select(r => r.IdGrupo)
                    .ToList();
                var nuevoGrupos = dto.Idsgrupo.Except(grupoActuales).ToList();

                foreach (int idGrupo in nuevoGrupos)
                {
                    var grupo = await db.RecGrupo.FindAsync(idGrupo);
                    if (grupo != null)
                    {
                        RecUsuarioGrupo relacion = new()
                        {
                            Grupo = grupo,
                            Usuario = usuario
                        };
                        usuario.RecUsuarioGrupo.Add(relacion);
                    }
                }

                var relacionesEliminar = db.RecUsuarioGrupo
                    .Where(r => r.IdUsuario == usuario.Id && !dto.Idsgrupo.Contains(r.IdGrupo))
                    .ToList();
                db.RecUsuarioGrupo.RemoveRange(relacionesEliminar);

                await db.SaveChangesAsync();

                await WSManager.BroadcastOne(usuario.Id, new IResponseSocket
                {
                    Data = "",
                    Message = "Tus accesos han cambiado",
                    Type = Sockets.Types.USERGROUP
                });

                return res.SuccessResponse(Messages.RecUsuario.UPDATED, CreateRes(usuario));
            }).RequireAuthorization().WithTags(tag);

            app.MapDelete(baseUrl + "/{id}", async (int id, DBContext db) =>
            {
                var Usuario = await db.RecUsuario.Include(c => c.RecUsuarioGrupo).FirstOrDefaultAsync(c => c.Id == id);
                if (Usuario is null) return res.NotFoundResponse(Messages.RecUsuario.NOTFOUND);
                db.RecUsuario.Remove(Usuario);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.RecUsuario.DELETED, "");
            }).RequireAuthorization().WithTags(tag);
        }
    }
}