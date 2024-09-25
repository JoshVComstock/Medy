namespace server.Responses
{
    public class PacienteRes : BaseRes
    {
        public required int Id { get; set; }
        public required string NombrePaciente { get; set; }
        public required string SexoPaciente { get; set; }
        public required int EdadGestacionalSemanaPaciente { get; set; }
        public required int EdadGestacionalDiaPaciente { get; set; }
        public required DateOnly FechaNacimientoPaciente { get; set; }
        public required double PesoNacimientoPaciente { get; set; }
        public required bool NacimientoTerminoPaciente { get; set; }
        public required string Madre { get; set; }

    }
}