namespace server.Models
{
    public class Cartilla : Base
    {
        public required string CodigoBarras { get; set; }
        public required DateOnly FechaTomaMuestras { get; set; }
        public required int NumeroMuestra { get; set; }
        public required bool? Transfucion { get; set; }
        public required string? Antibioticos { get; set; }
        public required string? Notas { get; set; }
        public int IdPaciente { get; set; }
        public required Paciente Paciente { get; set; }
        public Resultado? Resultado { get; set; }


    }
}