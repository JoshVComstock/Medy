namespace server.Models
{
    public class ProdTarifaDetalle : Base
    {
        public int? IdTarifa { get; set; }
        public int? IdMoneda { get; set; }
        public int? IdProductoCategoria { get; set; }
        public int? IdProductoBase { get; set; }
        public int? IdProducto { get; set; }
        public required string PrecioComputable { get; set; }
        public required int PrecioFijo { get; set; }
        public required int Descuento { get; set; }
        public required string AplicadoEn { get; set; }
        public required int CantidadMin { get; set; }
        public required DateOnly FechaInicio { get; set; }
        public required DateOnly FechaFin { get; set; }
        public required ProdProductoBase ProdProductoBase { get; set; }
        public required ProdTarifa ProdTarifa { get; set; }
        public required ProdCategoria ProdCategoria { get; set; }
        public required ProdProducto ProdProducto { get; set; }
        public required RecMoneda RecMoneda { get; set; }
    }
}
