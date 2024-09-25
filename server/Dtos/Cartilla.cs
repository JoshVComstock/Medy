namespace server.Dtos
{
    public class CartillaDTO
    {
        // Datos de la Madre
        public required string NombreMadre { get; set; }
        public required string CiMadre { get; set; }
        public required string DireccionMadre { get; set; }
        public required string? DetalleDireccionMadre { get; set; }
        public required string TelefonoMadre { get; set; }
        public required string TelefonoEmergenciaMadre { get; set; }
        public required bool TratamientoHiportiroidismo { get; set; }
        public required bool TratamientoHipertiroidismo { get; set; }
        public required string TratamientoMadre { get; set; }
        public required string EnfermedadMadre { get; set; }
        public required int? IdProvincia { get; set; }

        // Datos del Paciente
        public required string NombrePaciente { get; set; }
        public required string SexoPaciente { get; set; }
        public required int EdadGestacionalSemanaPaciente { get; set; }
        public required int EdadGestacionalDiaPaciente { get; set; }
        public required DateOnly FechaNacimientoPaciente { get; set; }
        public required double PesoNacimientoPaciente { get; set; }
        public required bool NacimientoTerminoPaciente { get; set; }

        // Datos de la Cartilla
        public required string CodigoBarras { get; set; }
        public required DateOnly FechaTomaMuestras { get; set; }
        public required int NumeroMuestra { get; set; }
        public required bool? Transfucion { get; set; }
        public required string? Antibioticos { get; set; }
        public required string? Notas { get; set; }
    }
}