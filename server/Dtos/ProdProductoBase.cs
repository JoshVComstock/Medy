using server.Models;

namespace server.Dtos
{

   /* public class ProdBaseAtribValorRelList
    {
        public int IdAtribValor { get; set; }
        public int PrecioExtra { get; set; }
    }*/
    public class ProdProductoBaseDTO
    {
        public required int IdCategoria { get; set; }
        public required int IdUnidadMedida { get; set; }
        public required int IdUnidadMedCompra { get; set; }
        public required int IdEmpresa { get; set; }
        public required int IdTipoProducto { get; set; }

        // ============ START: prod_base_atrib_valor_rel fields ============
       // public required List<ProdBaseAtribValorRelList> ProdBaseAtribValorRel { get; set; }

        // ============ END: prod_base_atrib_valor_rel fields ============
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
        public required int PrecioCosto { get; set; }
        public required int PrecioVenta { get; set; }
        public required int Volumen { get; set; }
        public required int Peso { get; set; }
        public required bool Vendible { get; set; }
        public required bool Comprable { get; set; }
        public required bool Configurable { get; set; }
        public required string Trazabilidad { get; set; }
        public required string PlazoEntregaCli { get; set; }
        public required string TipoServEnt { get; set; }
    }
}
