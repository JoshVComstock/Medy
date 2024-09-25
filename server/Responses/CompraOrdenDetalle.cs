namespace server.Responses
{
    public class CompraOrdenDetalleRes : BaseRes
    {
        public required int Id { get; set; }
        public required int? IdCompraOrden { get; set; }
        public int? IdProducto { get; set; }
        public int? IdUnidadMedida { get; set; }
        public int? IdMoneda { get; set; }
        public required int IdEmpaquetado { get; set; }
        public required string Nombre { get; set; }
        public required int Cantidad { get; set; }
        public required int PrecioUnitario { get; set; }
        public required int PrecioSubtotal { get; set; }
        public required int PrecioTotal { get; set; }
        public required int PrecioImpuesto { get; set; }
        public required int CantidadSolicitada { get; set; }
        public required int CantidadRecibida { get; set; }
        public required int CantidadPaquete { get; set; }
        public required DateOnly FechaEsperada { get; set; }

    }

}