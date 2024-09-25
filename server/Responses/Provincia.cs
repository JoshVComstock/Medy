namespace server.Responses
{
    public class ProvinciaRes : BaseRes
    {
        public int Id { get; set; }
        public int IdCiudad { get; set; }
        public required CiudadRes Ciudad { get; set; }
        public required string Nombre { get; set; }
    }
}