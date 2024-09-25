using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.WebSockets;
using System.Security.Claims;
using System.Text;
using server.Constants;
using server.Data;

namespace server.Utils
{
  public static class WSManager
  {
    public static Dictionary<long, WebSocket> Connections { get; set; } = new();

    public static async Task HandleWebSocket(HttpContext context)
    {
      if (context.WebSockets.IsWebSocketRequest)
      {
        /* var authorizationHeader = context.Request.Headers["Authorization"].ToString(); */
        /* var token = authorizationHeader.Replace("Bearer ", string.Empty); */
        Response res = new();
        var token = context.Request.Query["token"];
        var tokenHandler = new JwtSecurityTokenHandler();
        var jsonToken = tokenHandler.ReadToken(token) as JwtSecurityToken;
        var userIdClaim = jsonToken?.Claims.FirstOrDefault(c => c.Type == "Id");
        if (userIdClaim != null && long.TryParse(userIdClaim.Value, out var userId))
        {
          using var ws = await context.WebSockets.AcceptWebSocketAsync();
          Connections[userId] = ws;

          await BroadcastAll(
            res.SocketResponse(Sockets.Types.CONNECT, $"{userId} se unió al WS", "")
          );
          await BroadcastAll(
            res.SocketResponse(Sockets.Types.COUNT, $"{Connections.Count} usuarios conectados", "")
          );

          try
          {
            await ReceiveMessage(ws, async (result, buffer) =>
            {
              if (result.MessageType == WebSocketMessageType.Text)
              {
                string message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                await BroadcastAll(
                  res.SocketResponse(Sockets.Types.MESSAGE, userId + ": " + message, "")
                );
              }
              else if (ws.State == WebSocketState.Open && (result.MessageType == WebSocketMessageType.Close || ws.State == WebSocketState.Aborted))
              {
                Connections.Remove(userId);

                await BroadcastAll(
                  res.SocketResponse(Sockets.Types.DISCONNECT, $"{userId} salió de la sala", "")
                );
                await BroadcastAll(
                  res.SocketResponse(Sockets.Types.COUNT, $"{Connections.Count} usuarios conectados", "")
                );

                if (result.CloseStatus != null)
                {
                  await ws.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);
                }
              }
            });
          }
          catch (Exception)
          {
            Console.WriteLine("◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Exception on ReceiveMessage ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇");
          }
        }
      }
      else
      {
        context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
      }
    }

    public static async Task NotifyAction(DBContext db, ClaimsPrincipal User, IResponseSocket data)
    {
      var tokenId = User.FindFirst("Id")?.Value;
      if (tokenId != null)
      {
        int userId = int.Parse(tokenId);
        var user = await db.RecUsuario.FindAsync(userId);
        if (user != null)
        {
          var response = new IResponseSocket
          {
            Type = data.Type,
            Data = data.Data,
            Message = user.Login + " " + data.Message
          };
          await BroadcastAll(response, userId);
        }
      }
    }

    public static async Task BroadcastAll(IResponseSocket data, long exclude = -1)
    {
      foreach (KeyValuePair<long, WebSocket> entry in Connections)
      {
        if (entry.Key != exclude)
        {
          await Broadcast(entry.Value, data);
        }
      }
    }

    public static async Task BroadcastOne(long userId, IResponseSocket data)
    {
      if (Connections.TryGetValue(userId, out var socket))
      {
        await Broadcast(socket, data);
      }
    }

    private static async Task Broadcast(WebSocket socket, IResponseSocket data)
    {
      if (socket.State == WebSocketState.Open)
      {
        var json = JsonUtils.ParseJson(data);
        var bytes = Encoding.UTF8.GetBytes(json);
        var arraySegment = new ArraySegment<byte>(bytes, 0, bytes.Length);
        await socket.SendAsync(arraySegment, WebSocketMessageType.Text, true, CancellationToken.None);
      }
    }

    public static async Task ReceiveMessage(WebSocket socket, Action<WebSocketReceiveResult, byte[]> handleMessage)
    {
      var buffer = new byte[1024 * 4];
      while (socket.State == WebSocketState.Open)
      {
        var result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
        handleMessage(result, buffer);
      }
    }
  }
}