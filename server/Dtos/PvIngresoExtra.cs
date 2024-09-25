namespace server.Responses
{
    public class PvIngresoExtraRes : BaseRes
    {
        public required int Id { get; set; }
        public required int NroDeVenta { get; set; }
        public int? Cajera { get; set; }
        public required string Descripcion { get; set; }
        public required int Recibo { get; set; }
        public required int Factura { get; set; }
        public required string TipoIngreso { get; set; }
        public required double Monto { get; set; }
    }
}
