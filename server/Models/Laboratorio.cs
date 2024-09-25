namespace server.Models
{
    public class Laboratorio : Base
    {
        public required string Nombre { get; set; }
        public required string Direccion { get; set; }
        public required int Telefono { get; set; }
        public int IdProvincia { get; set; }
        public required Provincia Provincia { get; set; }
        public List<Resultado> Resultado { get; set; } = new List<Resultado>();


    }
}