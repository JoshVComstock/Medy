using MongoDB.Bson;
using MongoDB.Driver;
using server.Models;

namespace server.Utils
{
    public class MongoManager
    {
        public bool IsConnected;
        public IMongoCollection<MongoUsuarioConfig> Usuario;

        public MongoManager()
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("appsettings.json", optional: true)
                .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production"}.json", optional: true)
                .Build();
            var connectionString = configuration.GetConnectionString("MongoConnection");
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("ERPBD");
            IsConnected = db.RunCommandAsync((Command<BsonDocument>)"{ping:1}").Wait(1000);
            Usuario = db.GetCollection<MongoUsuarioConfig>("usuario");
        }
    }
}