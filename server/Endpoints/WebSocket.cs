using server.Utils;
using System.Security.Claims;
using server.Constants;
using System.Net.WebSockets;

namespace server.Endpoints
{
    public static class WebSocketExt
    {
        public static void WebSocketEndpoints(this WebApplication app, IApplicationBuilder builder)
        {
            Response res = new();
            string tag = "Web Socket";
            string baseUrl = "/ws";

            app.MapGet(baseUrl, WSManager.HandleWebSocket).WithTags(tag);

            app.MapPost(baseUrl + "/{id:long}", async (long id, ClaimsPrincipal User) =>
            {
                var tokenId = User.FindFirst("Id")?.Value;
                if (tokenId == null) return res.BadRequestResponse(Messages.Auth.ERRORTOKEN);
                int userPinging = int.Parse(tokenId);
                await WSManager.BroadcastOne(id,
                    res.SocketResponse(Sockets.Types.MESSAGE, userPinging + " dice ping", "")
                );
                return res.SuccessResponse("Mensaje enviado correctamente", "");
            }).RequireAuthorization().WithTags(tag);

            builder.ApplicationServices.GetService<IHostApplicationLifetime>()?.ApplicationStopping.Register(() =>
            {
                // Desconectar todos los websockets
                foreach (var socket in WSManager.Connections.Values)
                {
                    if (socket.State == WebSocketState.Open)
                    {
                        socket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Server shutting down", CancellationToken.None).Wait();
                    }
                }
            });
        }
    }
}