namespace server.Models
{
    public class Provincia : Base
    {
        public int IdCiudad { get; set; }
        public required string Nombre { get; set; }
        public required Ciudad Ciudad { get; set; }
        public List<Municipio> Municipio { get; set; } = new List<Municipio>();
        public List<Laboratorio> Laboratorio { get; set; } = new List<Laboratorio>();
        public List<Madre> Madre { get; set; } = new List<Madre>();

    }
}