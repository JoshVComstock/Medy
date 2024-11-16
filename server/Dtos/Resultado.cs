namespace server.Dtos
{
    public class ResultadoDTO
    {
        public required DateOnly FechaIngreso { get; set; }
        public required DateOnly FechaResultado { get; set; }
        public required DateOnly FechaEntregado { get; set; }
        public required string ResultadoPaciente { get; set; }
        public required string Metodo { get; set; }
        public required string ValorResultado { get; set; }
        public required string ValorReferencia { get; set; }
        public required string? Observacion { get; set; }
        public required bool Envio { get; set; }

        public int IdCartilla { get; set; }
        public int IdLaboratorio { get; set; }
    }
}