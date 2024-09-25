namespace server.Responses
{
    public class ProdTarifaRes : BaseRes
    {
        public required int Id { get; set; }
        public required RecMonedaRes Moneda { get; set; }
        public int? IdMoneda { get; set; }
        public required RecEmpresaInfoRes Empresa { get; set; }
        public int? IdEmpresa { get; set; }
        public required int Secuencia { get; set; }
        public required string Nombre { get; set; }
        public required string PoliticaDescuento { get; set; }
        public required List<ProdTarifaDetalleRes> TarifaDetalle { get; set; }

    }
}
