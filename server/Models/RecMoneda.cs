namespace server.Models
{
    public class RecMoneda : Base
    {
        public required string Codigo { get; set; }
        public required string Simbolo { get; set; }
        public required string Nombre { get; set; }
        public required int Decimales { get; set; }
        public required string UnidadMonetaria { get; set; }
        public required string SubUnidadMonetaria { get; set; }
        public required int Redondeo { get; set; }
        public List<ProdTarifa> ProdTarifa { get; set; } = new List<ProdTarifa>();
        public List<ProdTarifaDetalle> ProdTarifaDetalle { get; set; } = new List<ProdTarifaDetalle>();
        public List<RecEmpresa> RecEmpresa { get; set; } = new List<RecEmpresa>();
        public List<PvEfectivo> PvEfectivo { get; set; } = new List<PvEfectivo>();
        public List<CompraOrden> CompraOrden { get; set; } = new List<CompraOrden>();
        public List<CompraOrdenDetalle> CompraOrdenDetalle { get; set; } = new List<CompraOrdenDetalle>();
        public List<RecContactoBanco> RecContactoBanco { get; set; } = new List<RecContactoBanco>();
        public List<VentaOrden> VentaOrden { get; set; } = new List<VentaOrden>();
        public List<VentaOrdenDetalle> VentaOrdenDetalle { get; set; } = new List<VentaOrdenDetalle>();
        public List<PvCaja> PvCaja { get; set; } = new List<PvCaja>();

    }
}
