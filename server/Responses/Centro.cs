namespace server.Responses
{
    public class CentroRes : BaseRes
    {
        public required int Id { get; set; }
        public int IdMunicipio { get; set; }
        public required string Direccion { get; set; }
        public required string Nombre { get; set; }
        public required string Area { get; set; }
        public required string? SeguimientoCasos { get; set; }
        public required string Contacto { get; set; }
        public required string? Telefono { get; set; }
        public required string Municipio { get; set; }

    }
}