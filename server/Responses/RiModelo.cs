namespace server.Responses
{
    public class RiModeloRes : BaseRes
    {
        public required int Id { get; set; }
        public required string Modelo { get; set; }
        public required string Descripcion { get; set; }
        public required string Tipo { get; set; }
        public required string Secuencia { get; set; }
        public required int IdMenu { get; set; }
        public required string NombreMenu { get; set; }
    }
}
