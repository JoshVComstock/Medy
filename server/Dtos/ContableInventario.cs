namespace server.Dtos
{
  public class ContableInventarioDTO
  {
    public required int IdContableCuenta { get; set; }
    public required string Descripcion { get; set; }
    public required double PrecioCompra { get; set; }
    public required DateOnly FechaCompra { get; set; }
    public required DateOnly FechaIniDepreciacion { get; set; }
  }
}