
using server.Models;
using server.Utils;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using auth.Dtos;
using server.Data;
using auth.Utils;
using server.Constants;

namespace server.Endpoints
{
    public static class AuthExt
    {
        public static void AuthEndpoints(this WebApplication app)
        {
            Response res = new();
            string tag = "Authentication";
            string baseUrl = "/auth";

            app.MapPost(baseUrl + "/register", async (RegisterDTO body, DBContext db) =>
            {
                var exist = await db.RecUsuario.AnyAsync(u => u.Login == body.Login);
                if (exist) return res.BadRequestResponse("Este nombre de usuario ya existe");
                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(body.Password);
                var newUser = new RecUsuario
                {
                    IdAccion = 1,
                    // IdEmpresa = 1,
                    IdContacto = null,
                    IdTipoUsuario = null,
                    Login = body.Login,
                    Password = hashedPassword,
                    Telefono = body.Telefono,
                    Activo = true,
                    Estado = States.ACTIVE,

                };
                db.RecUsuario.Add(newUser);
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.Auth.CREATED, newUser);
            }).WithTags(tag);

            app.MapPost(baseUrl + "/login", async (LoginDTO body, DBContext db) =>
            {
                var user = await db.RecUsuario.Where(u => u.Login == body.Username).FirstOrDefaultAsync();
                if (user == null) return res.NotFoundResponse(Messages.Auth.NOTFOUND);
                bool hash = BCrypt.Net.BCrypt.Verify(body.Password, user.Password);
                if (user == null || !hash) return res.NotFoundResponse(Messages.Auth.UNAUTHORIZED);
                var key = app.Configuration.GetValue<string>("JWT:Key");
                var issuer = app.Configuration.GetValue<string>("JWT:Issuer");
                var audience = app.Configuration.GetValue<string>("JWT:Audience");
                if (key == null || issuer == null || audience == null) return res.BadRequestResponse(Messages.Auth.ERRORCONFIG);
                var token = GenerateToken(user.Id, new JwtSecrets
                {
                    Key = key,
                    Audience = audience,
                    Issuer = issuer
                });

                return res.SuccessResponse(Messages.Auth.FOUND, token);
            }).WithTags(tag);

            app.MapGet(baseUrl + "/me", (DBContext db, ClaimsPrincipal User) =>
            {
                var tokenId = User.FindFirst("Id")?.Value;
                if (tokenId == null) return res.BadRequestResponse(Messages.Auth.ERRORTOKEN);
                int id = int.Parse(tokenId);
                var user = db.RecUsuario.Find(id);
                if (user == null) return res.NotFoundResponse(Messages.Auth.NOTFOUND);
                return res.SuccessResponse(Messages.Auth.FOUND, user);
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/user", async (AuthUpdateDTO body, DBContext db, ClaimsPrincipal User) =>
            {
                var tokenId = User.FindFirst("Id")?.Value;
                if (tokenId == null) return res.BadRequestResponse(Messages.Auth.ERRORTOKEN);
                int id = int.Parse(tokenId);
                var exist = await db.RecUsuario.AnyAsync(u => u.Login == body.Login && u.Id != id);
                if (exist) return res.BadRequestResponse(Messages.Auth.EXISTSUSERNAME);
                var user = await db.RecUsuario.FindAsync(id);
                if (user == null) return res.NotFoundResponse(Messages.Auth.NOTFOUND);
                user.Login = body.Login;
                user.Telefono = body.Telefono;
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.Auth.UPDATED, user);
            }).RequireAuthorization().WithTags(tag);

            app.MapPut(baseUrl + "/user/{id:int}", async (int id, AuthUpdateDTO body, DBContext db, ClaimsPrincipal User) =>
            {
                var exist = await db.RecUsuario.AnyAsync(u => u.Login == body.Login && u.Id != id);
                if (exist) return res.BadRequestResponse(Messages.Auth.EXISTSUSERNAME);
                var user = await db.RecUsuario.FindAsync(id);
                if (user == null) return res.NotFoundResponse(Messages.Auth.NOTFOUND);
                user.Login = body.Login;
                user.Telefono = body.Telefono;
                await db.SaveChangesAsync();

                await WSManager.BroadcastOne(id,
                    res.SocketResponse(Sockets.Types.USERMODIFY, "Se modificó tu usuario", user)
                );

                return res.SuccessResponse(Messages.Auth.UPDATED, user);
            }).RequireAuthorization().WithTags(tag);

            app.MapPost(baseUrl + "/password", async (CambiarContraDTO body, DBContext db, ClaimsPrincipal User) =>
            {
                var tokenId = User.FindFirst("Id")?.Value;
                if (tokenId == null) return res.BadRequestResponse(Messages.Auth.ERRORTOKEN);
                int id = int.Parse(tokenId);
                var user = await db.RecUsuario.FindAsync(id);
                if (user == null) return res.NotFoundResponse(Messages.Auth.NOTFOUND);
                bool hash = BCrypt.Net.BCrypt.Verify(body.Actual, user.Password);
                if (!hash) return res.BadRequestResponse(Messages.Auth.ERRORPASSWORDACTUAL);
                if (body.Nueva != body.Confirmar) return res.BadRequestResponse(Messages.Auth.ERRORPASSWORDBODY);
                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(body.Nueva);
                user.Password = hashedPassword;
                await db.SaveChangesAsync();
                return res.SuccessResponse(Messages.Auth.UPDATEDPASSWORD, user);
            }).RequireAuthorization().WithTags(tag);

            /* app.MapPost(baseUrl + "/logout", (HttpContext context) =>
            {

                var token = context.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
                return res.SuccessResponse("Sesión cerrada correctamente", "");

            }).WithTags(tag); */
        }

        public static string GenerateToken(int idUser, JwtSecrets secrets)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secrets.Key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>(){
            new Claim("Id", idUser.ToString())
        };
            var token = new JwtSecurityToken(
                secrets.Issuer,
                secrets.Audience,
                claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}