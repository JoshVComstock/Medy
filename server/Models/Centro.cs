namespace server.Models
{
    public class Centro : Base
    {
        public int IdMunicipio { get; set; }
        public required string Direccion { get; set; }
        public required string Nombre { get; set; }
        public required string Area { get; set; }
        public required string? SeguimientoCasos { get; set; }
        public required string Contacto { get; set; }
        public required string? Telefono { get; set; }
        public required Municipio Municipio { get; set; }
        public List<ManejoCartilla> ManejoCartilla { get; set; } = new List<ManejoCartilla>();

    }
}