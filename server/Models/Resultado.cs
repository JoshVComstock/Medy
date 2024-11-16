namespace server.Models
{
    public class Resultado : Base
    {
        public required DateOnly FechaIngreso { get; set; }
        public required DateOnly FechaResultado { get; set; }
        public required DateOnly FechaEntregado { get; set; }
        public required string ResultadoPaciente { get; set; }
        public required string Metodo { get; set; }
        public required string ValorResultado { get; set; }
        public required string ValorReferencia { get; set; }
        public required string? Observacion { get; set; }
        public int IdCartilla { get; set; }
        public int IdLaboratorio { get; set; }
        public required bool Envio { get; set; } 
        public required Cartilla Cartilla { get; set; }
        public required Laboratorio Laboratorio { get; set; }
    }
}