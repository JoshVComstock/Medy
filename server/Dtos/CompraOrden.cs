namespace server.Dtos
{
    public class CompraOrdenDTO
    {
        public required int  IdProveedor { get; set; }
        public required int IdMoneda { get; set; }
        public required string RefProveedor { get; set; }
        public required string CodOrden { get; set; }
        public required int  IdEmpresa { get; set; }
        public required int EstadoCompra { get; set; }
        public required int Prioridad { get; set; }
        public required string Nota { get; set; }
        public required int IdUsrComprador { get; set; }
        public required int MontoSinImpuesto { get; set; }
        public required int MontoImpuesto { get; set; }
        public required int MontoTotal { get; set; }
        public required DateOnly FechaLimitePedido { get; set; }
        public required DateOnly FechaConfirmacion { get; set; }
        public required DateOnly FechaEntregaPlanifi { get; set; }
        public required List<CompraOrdenDetalleDTO> CompraOrdenDetalle { get; set; }
        
    }
}