namespace server.Responses
{
    public class PvEntregaEfectivoRes : BaseRes
    {
        public required int Id { get; set; }
        public required string Descripcion { get; set; }
        public required string Moneda { get; set; }
        public required double MontoBs { get; set; }
        public required double MontoSus { get; set; }
        public required string Cajera { get; set; }
    }
}