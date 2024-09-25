namespace server.Models
{
    public class PvEfectivo : Base
    {
        public int? IdMoneda { get; set; }
        public required string Descripcion { get; set; }
        public required double Valor { get; set; }
        public required RecMoneda Moneda { get; set; }
        public List<PvCaja> PvCaja { get; set; } = new List<PvCaja>();
    }
}
