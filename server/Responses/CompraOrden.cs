using server.Models;

namespace server.Responses
{
    public class CompraOrdenRes : BaseRes
    {
        public required int Id { get; set; }
        public required string CodOrden { get; set; }
        public required RecContactoRes Proveedor { get; set; }
        public int? IdProveedor { get; set; }
        public required RecMonedaRes Moneda { get; set; }
        public int? IdMoneda { get; set; }
        public required string RefProveedor { get; set; }
        public required RecEmpresaInfoRes Empresa { get; set; }
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
        public required List<CompraOrdenDetalleRes> OrdenDetalles { get; set; }

    }
}