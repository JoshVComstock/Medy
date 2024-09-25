namespace server.Responses
{
    public class VentaOrdenDetalleRes : BaseRes
    {
        public required int Id { get; set; }
        public int? IdVentaOrden { get; set; }
        public required int Secuencia { get; set; }
        public int? IdMoneda { get; set; }
        public int? IdProducto { get; set; }
        public int? IdUnidadMedida { get; set; }
        public required int IdEmpaquetado { get; set; }
        public required string EstadoOrden { get; set; }
        public required string EstadoFacturacion { get; set; }
        public required string CodigoInterno { get; set; }
        public required string Nombre { get; set; }
        public required int Cantidad { get; set; }
        public required int PrecioUnitario { get; set; }
        public required int Descuento { get; set; }
        public required int PrecioReducido { get; set; }
        public required int PrecioImpuesto { get; set; }
        public required int PrecioUnitConImpuesto { get; set; }
        public required int PrecioUnitSinImpuesto { get; set; }
        public required int SubtotalConImpuesto { get; set; }
        public required int SubtotalSinImpuesto { get; set; }
        public required int CantidadEnviada { get; set; }
        public required int TiempoEspera { get; set; }

    }
}