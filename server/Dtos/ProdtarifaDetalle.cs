namespace server.Dtos
{
    public class ProdTarifaDetalleDTO
    {
        public int? Id { get; set; }
        public required int? IdMoneda { get; set; }
        public required int? IdProductoCategoria { get; set; }
        public required int? IdProductoBase { get; set; }
        public required int? IdProducto { get; set; }
        public required string PrecioComputable { get; set; }
        public required int PrecioFijo { get; set; }
        public required int Descuento { get; set; }
        public required string AplicadoEn { get; set; }
        public required int CantidadMin { get; set; }
        public required DateOnly FechaInicio { get; set; }
        public required DateOnly FechaFin { get; set; }

    }
}
