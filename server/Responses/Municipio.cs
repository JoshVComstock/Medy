namespace server.Responses
{
    public class MunicipioRes : BaseRes
    {
        public required int Id { get; set; }
        public int IdProvincia { get; set; }
        public required string Nombre { get; set; }
        public required string Provincia { get; set; }

    }
}