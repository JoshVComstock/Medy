namespace server.Dtos
{
  public class PvRegistroGastosDTO
  {
    public required string Descripcion { get; set; }
    public required string Autorizado { get; set; }
    public required string Recibo { get; set; }
    public required string Factura { get; set; }
    public required string Moneda { get; set; }
    public double? MontoBs { get; set; }
    public double? MontoSus { get; set; }
  }
}