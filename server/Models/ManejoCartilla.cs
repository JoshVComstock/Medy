namespace server.Models
{
    public class ManejoCartilla : Base
    {
        public required string TipoManejo { get; set; }
        public int IdCentro { get; set; }
        public required int CantidadEntrega { get; set; }
        public required int? CantidadRecivida { get; set; }
        public required int CodigoTarjetaInicio { get; set; }
        public required int CodigoTarjetaFinal { get; set; }
        public required string EntregadoPor { get; set; }
        public required string? RecibidoPor { get; set; }
        public required string? Telefono { get; set; }
        public required Centro Centro { get; set; }
    
    }
}