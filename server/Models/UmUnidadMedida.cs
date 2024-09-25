namespace server.Models
{
    public class UmUnidadMedida : Base
    {
        public int? IdCategoria { get; set; }
        public required string Nombre { get; set; }
        public required string Tipo { get; set; }
        public required decimal Ratio { get; set; }
        public required decimal Redondeo { get; set; }
        public required UmCategoria Categoria { get; set; }
        public List<ProdProductoBase> ProdProductoBase { get; set; } = new List<ProdProductoBase>();
        public List<VentaOrdenDetalle> VentaOrdenDetalle { get; set; } = new List<VentaOrdenDetalle>();
        public List<CompraOrdenDetalle> CompraOrdenDetalle { get; set; } = new List<CompraOrdenDetalle>();

    }
}
