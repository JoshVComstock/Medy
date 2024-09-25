namespace server.Models
{
    public class ProdProductoAtribValorRel : Base
    {
        public int IdProdBaseAtriValorRel { get; set; }
        public int IdProdProducto { get; set; }
        public required ProdBaseAtribValorRel ProdBaseAtribValorRel { get; set; }
        public required ProdProducto ProdProducto { get; set; }
    }
}