namespace server.Dtos
{
    public class UmUnidadMedidaDTO
    {
        public int? IdCategoria { get; set; }
        public required string Nombre { get; set; }
        public required string Tipo { get; set; }
        public required decimal Ratio { get; set; }
        public required decimal Redondeo { get; set; }
    }
}
