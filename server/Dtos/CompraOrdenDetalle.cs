namespace server.Dtos
{
    public class CompraOrdenDetalleDTO
    {
        public required int IdProducto { get; set; }
        public required int IdUnidadMedida { get; set; }
        public required int IdMoneda { get; set; }
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