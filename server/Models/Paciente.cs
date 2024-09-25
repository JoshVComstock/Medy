namespace server.Models
{
    public class Paciente : Base
    {
        public required string Nombre { get; set; }
        public required string Sexo { get; set; }
        public required int EdadGestacionalSemana { get; set; }
        public required int EdadGestacionalDia { get; set; }
        public required DateOnly FechaNacimiento { get; set; }
        public required double PesoNacimiento { get; set; }
        public required bool NacimientoTermino { get; set; }
        public int IdMadre { get; set; }
        public required Madre Madre { get; set; }
        public List<Cartilla> Cartilla { get; set; } = new List<Cartilla>();

    }
}