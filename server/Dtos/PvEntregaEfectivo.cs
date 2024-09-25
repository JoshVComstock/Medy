

namespace server.Dtos
{
    public class PvEntregaEfectivoDTO
    {
        public required string Descripcion { get; set; }
        public required string Moneda { get; set; }
        public required double MontoBs { get; set; }
        public required double MontoSus { get; set; }
        public required string Cajera { get; set; }
    }
}
