namespace server.Models
{
    public class Madre : Base
    {
        public required string Nombre { get; set; }
        public required string Ci { get; set; }
        public required string Direccion { get; set; }
        public required string? DetalleDireccion { get; set; }
        public required string Telefono { get; set; }
        public required string TelefonoEmergencia { get; set; }
        public required bool TratamientoHiportiroidismo { get; set; }
        public required bool TratamientoHipertiroidismo { get; set; }
        public required string Tratamiento { get; set; }
        public required string Enfermedad { get; set; }
        public int IdProvincia { get; set; }
        public required Provincia Provincia { get; set; }
        public List<Paciente> Paciente { get; set; } = new List<Paciente>();


    }
}