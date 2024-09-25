namespace server.Models
{
    public class ProdProductoBase : Base
    {
        public int? IdCategoria { get; set; }
        public int? IdUnidadMedida { get; set; }
        public required int IdUnidadMedCompra { get; set; }
        public int? IdEmpresa { get; set; }
        public required int IdTipoProducto { get; set; }
        public required int Secuencia { get; set; }
        public required int Color { get; set; }
        public required string CodInterno { get; set; }
        public required string CodFabricante { get; set; }
        public required string CodBarras { get; set; }
        public required string Prioridad { get; set; }
        public required string Nombre { get; set; }
        public required string Descripcion { get; set; }
        public required string DescripcionCompra { get; set; }
        public required string DescripcionVenta { get; set; }
        public required int PrecioVenta { get; set; }
        public required int PrecioCosto { get; set; }
        public required int Volumen { get; set; }
        public required int Peso { get; set; }
        public required bool Vendible { get; set; }
        public required bool Comprable { get; set; }
        public required bool Configurable { get; set; }
        public required string Trazabilidad { get; set; }
        public required string PlazoEntregaCli { get; set; }
        public required string TipoServEnt { get; set; }
        public required ProdCategoria Categoria { get; set; }
        public required UmUnidadMedida UnidadMedica { get; set; }
        public required RecEmpresa Empresa { get; set; }
        public List<ProdProducto> ProdProducto { get; set; } = new List<ProdProducto>();
        public List<ProdBaseAtribValorRel> ProdBaseAtributoValorRel { get; set; } = new List<ProdBaseAtribValorRel>();
        public List<ProdTarifaDetalle> ProdTarifaDetalle { get; set; } = new List<ProdTarifaDetalle>();

    }
}
