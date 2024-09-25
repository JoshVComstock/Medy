namespace server.Responses
{
    public class PvEfectivoRes : BaseRes
    {
        public required int Id { get; set; }
        public required RecMonedaRes Moneda { get; set; }
        public int? IdMoneda { get; set; }
        public required string Descripcion { get; set; }
        public required double Valor { get; set; }
    }
}
