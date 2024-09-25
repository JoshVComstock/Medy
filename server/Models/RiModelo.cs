namespace server.Models
{
    public class RiModelo : Base
    {
        public required string Modelo { get; set; }
        public required string Descripcion { get; set; }
        public required string Tipo { get; set; }
        public required string Secuencia { get; set; }
        public  int IdMenu { get; set; }
        public required RiMenu Menu { get; set; }
        public List<RiAccesoModelo> RiAccesoModelo = new List<RiAccesoModelo>();
    }
}
