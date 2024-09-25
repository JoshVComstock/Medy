namespace server.Dtos
{
    public class ProdTarifaDTO
    {
        public int? IdMoneda { get; set; }
        public int? IdEmpresa { get; set; }
        public required int Secuencia { get; set; }
        public required string Nombre { get; set; }
        public required string PoliticaDescuento { get; set; }
        public required List<ProdTarifaDetalleDTO> TarifaDetalle { get; set; }
    }
    public class ProdTarifaputDto : ProdTarifaDTO
    {
        public required List<List<int>> Dto { get; set; }
    }
}
