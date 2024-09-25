using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace server.Models
{
    public class MongoUsuarioConfig
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("userId")]
        public required int UserId { get; set; }
        [BsonElement("config")]
        [BsonExtraElements]
        public required BsonDocument Config { get; set; }
    }
}
