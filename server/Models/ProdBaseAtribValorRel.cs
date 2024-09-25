namespace server.Models
{
    public class ProdBaseAtribValorRel : Base
    {
        public int IdAtribValor { get; set; }
        public int IdProdBase { get; set; }
        public required int PrecioExtra { get; set; }
        public required ProdAtributoValor AtributoValor { get; set; }
        public required ProdProductoBase ProductoBase { get; set; }
        public List<ProdProducto> ProdProducto { get; set; } = new List<ProdProducto>();
        public List<ProdProductoAtribValorRel> ProdProductoAtribValorRel { get; set; } = new List<ProdProductoAtribValorRel>();

    }
}
