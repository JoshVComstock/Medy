namespace server.Dtos
{
    public class RecMonedaDTO
    {
        public required string Codigo { get; set; }
        public required string Simbolo { get; set; }
        public required string Nombre { get; set; }
        public required int Decimales{ get; set; }
        public required string UnidadMonetaria { get; set; }
        public required string SubUnidadMonetaria { get; set; }
        public required int Redondeo { get; set; }
    }
}
