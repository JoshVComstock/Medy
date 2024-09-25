namespace server.Dtos
{
  public class ContableCuentasActivosDTO
  {
    public required int IdContableCuenta { get; set; }
    public required int Tiempo { get; set; }
    public required double MontoDepreciado { get; set; }
  }
}