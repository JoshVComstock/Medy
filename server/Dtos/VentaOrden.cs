namespace server.Dtos
{
    public class VentaOrdenDTO
    {
        public required int IdEmpresa { get; set; }
        public required int IdCliente { get; set; }
        public required int IdTerminosPago { get; set; }
        public required int IdPrecio { get; set; }
        public required int IdMoneda { get; set; }
        public required int IdVendedor { get; set; }
        public required int IdEquipo { get; set; }
        public required int IdAlmacen { get; set; }
        public required string Toker { get; set; }
        public required string CodigoOrden { get; set; }
        public required string EstadoOrden { get; set; }
        public required string EstadoFacturacion { get; set; }
        public required DateOnly FechaValidez { get; set; }
        public required int Tc { get; set; }
        public required int MontoSinImpuesto { get; set; }
        public required int MontoImpuesto { get; set; }
        public required int MontoImpago { get; set; }
        public required int MontoTotal { get; set; }
        public required string Nota { get; set; }
        public required List<VentaOrdenDetalleDTO> VentaOrdenDetalle { get; set; }

    }
}