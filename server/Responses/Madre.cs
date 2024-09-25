namespace server.Responses
{
    public class MadreRes : BaseRes
    {
        public required int Id { get; set; }
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
        public required string ProvinciaMadre { get; set; }

    }
}