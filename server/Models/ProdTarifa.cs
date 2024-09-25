namespace server.Models
{
    public class ProdTarifa : Base
    {
        public int? IdMoneda { get; set; }
        public int? IdEmpresa { get; set; }
        public required int Secuencia { get; set; }
        public required string Nombre { get; set; }
        public required string PoliticaDescuento { get; set; }
        public required RecEmpresa Empresa { get; set; }
        public required RecMoneda RecMoneda { get; set; }
        public List<ProdTarifaDetalle> ProdTarifaDetalle { get; set; } = new List<ProdTarifaDetalle>();

    }
}
