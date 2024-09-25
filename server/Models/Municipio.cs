namespace server.Models
{
    public class Municipio : Base
    {
        public int IdProvincia { get; set; }
        public required string Nombre { get; set; }
        public required Provincia Provincia { get; set; }
        public List<Centro> Centro { get; set; } = new List<Centro>();

    }
}