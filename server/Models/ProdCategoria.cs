﻿namespace server.Models
{
    public class ProdCategoria : Base
    {
        public required int IdPadre { get; set; }
        public required string Nombre { get; set; }
        public required string NombreCompleto { get; set; }
        public required string PathPadre { get; set; }
        public required int IdEstrategiaEliminacion { get; set; }
        public required string MetodoEmbalaje { get; set; }
        public List<ProdProductoBase> ProdProductoBase { get; set; } = new List<ProdProductoBase>();
        public List<ProdTarifaDetalle> ProdTarifaDetalle { get; set; } = new List<ProdTarifaDetalle>();

    }
}