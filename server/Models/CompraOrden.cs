namespace server.Models
{
    public class CompraOrden : Base
    {
        public required string CodOrden { get; set; }
        public int? IdProveedor { get; set; }
        public int? IdMoneda { get; set; }
        public required string RefProveedor { get; set; }
        public int? IdEmpresa { get; set; }
        public required int EstadoCompra { get; set; }
        public required int Prioridad { get; set; }
        public required string Nota { get; set; }
        public required int IdUsrComprador { get; set; }
        public required int MontoSinImpuesto { get; set; }
        public required int MontoImpuesto { get; set; }
        public required int MontoTotal { get; set; }
        public required DateOnly FechaLimitePedido { get; set; }
        public required DateOnly FechaConfirmacion { get; set; }
        public required DateOnly FechaEntregaPlani { get; set; }
        public required RecContacto Proveedor { get; set; }
        public required RecMoneda Moneda { get; set; }
        public required RecEmpresa Empresa { get; set; }
        public List<CompraOrdenDetalle> CompraOrdenDetalle { get; set; } = new List<CompraOrdenDetalle>();

    }
}