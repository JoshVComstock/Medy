namespace server.Models
{
    public class ProdProducto : Base
    {
        public int IdProdBase { get; set; }
        public required string CodInterno { get; set; }
        public required string CodFabricante { get; set; }
        public required string CodBarras { get; set; }
        public required int Volumen { get; set; }
        public required int Peso { get; set; }
        public required string? PathImagen { get; set; }
        public required ProdProductoBase ProdProductoBase { get; set; }
        public List<CompraOrdenDetalle> CompraOrdenDetalle { get; set; } = new List<CompraOrdenDetalle>();
        public List<VentaOrdenDetalle> VentaOrdenDetalle { get; set; } = new List<VentaOrdenDetalle>();
        public List<ProdProductoAtribValorRel> ProdProductoAtribValorRel { get; set; } = new List<ProdProductoAtribValorRel>();
        public List<ProdTarifaDetalle> ProdTarifaDetalle { get; set; } = new List<ProdTarifaDetalle>();

    }
}
