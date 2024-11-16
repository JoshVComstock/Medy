namespace server.Responses
{
    public class ResultadoRes : BaseRes
    {
        public required int Id { get; set; }
        public required string NombrePaciente { get; set; }
        public required DateOnly FechaIngreso { get; set; }
        public required DateOnly FechaResultado { get; set; }
        public required DateOnly FechaEntregado { get; set; }
        public required string ResultadoPaciente { get; set; }
        public required string Metodo { get; set; }
        public required string ValorResultado { get; set; }
        public required string ValorReferencia { get; set; }
        public required string? Observacion { get; set; }
        public required int IdCartilla { get; set; }
        public required int IdLaboratorio { get; set; }
        public required string CodigoBarra { get; set; }
        public required bool Envio { get; set; }
    }
}