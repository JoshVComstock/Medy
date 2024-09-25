namespace server.Dtos
{
    public class CentroDTO
    {
        public int IdMunicipio { get; set; }
        public required string Direccion { get; set; }
        public required string Nombre { get; set; }
        public required string Area { get; set; }
        public required string? SeguimientoCasos { get; set; }
        public required string Contacto { get; set; }
        public required string? Telefono { get; set; }

    }
}