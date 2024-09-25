using server.Models;
using server.Utils;
using System.Security.Claims;
using server.Constants;
using MongoDB.Bson;
using System.Text.Json.Nodes;
using MongoDB.Driver;

namespace server.Endpoints
{
    public static class UsuarioConfiguracioneEndpoint
    {
        public static void UsuarioConfigEndpoint(this WebApplication app)
        {
            Response res = new();
            string tag = "UsuarioConfiguracion";
            string baseUrl = "/usuarioConfiguracion";
            MongoManager mongo = new();

            app.MapGet(baseUrl, async (ClaimsPrincipal User) =>
            {
                if (!mongo.IsConnected) return res.NotFoundResponse("No se pudo conectar a la base de datos de configuraciones");
                var tokenId = User.FindFirst("Id")?.Value;
                if (tokenId == null) return res.BadRequestResponse(Messages.Auth.ERRORTOKEN);
                int id = int.Parse(tokenId);

                var filter = Builders<MongoUsuarioConfig>.Filter.Eq("UserId", id);
                var document = await mongo.Usuario.Find(filter).FirstOrDefaultAsync();
                if (document == null) return res.NotFoundResponse("Configuración no encontrada");
                var obj = document.Config.ToDictionary();
                var config = obj["config"];

                return res.SuccessResponse("", config);
            }).RequireAuthorization().WithTags(tag);

            app.MapPost(baseUrl, async (JsonObject usu, ClaimsPrincipal User) =>
            {
                if (!mongo.IsConnected) return res.NotFoundResponse("No se pudo conectar a la base de datos de configuraciones");
                var tokenId = User.FindFirst("Id")?.Value;
                if (tokenId == null) return res.BadRequestResponse(Messages.Auth.ERRORTOKEN);
                int id = int.Parse(tokenId);

                string json = usu.ToString();
                var bson = BsonDocument.Parse(json);
                var config = new BsonDocument {
                    {
                        "config", bson
                    }
                };

                var filter = Builders<MongoUsuarioConfig>.Filter.Eq("UserId", id);
                var query = await mongo.Usuario.Find(filter).FirstOrDefaultAsync();
                if (query == null)
                {
                    // NO SE ENCONTRÓ EL DOCUMENTO ENTONCES SE CREA UNO NUEVO
                    var doc = new MongoUsuarioConfig
                    {
                        UserId = id,
                        Config = config
                    };
                    await mongo.Usuario.InsertOneAsync(doc);
                }
                else
                {
                    var update = Builders<MongoUsuarioConfig>.Update.Set(u => u.Config, bson);
                    await mongo.Usuario.UpdateOneAsync(filter, update);
                }
                return res.SuccessResponse("Configuración guardada correctamente", "");
            }).RequireAuthorization().WithTags(tag);
        }
    }
}
