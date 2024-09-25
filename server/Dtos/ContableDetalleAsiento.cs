namespace server.Dtos
{
  public class DetalleAsientoDTO
  {
    public required int IdCuenta { get; set; }
    public required int IdAsiento { get; set; }
    public required string Glosa { get; set; }
    public required string Moneda { get; set; }
    public required double? DebeBs { get; set; }
    public required double? DebeSus { get; set; }
    public required double? HaberBs { get; set; }
    public required double? HaberSus { get; set; }
  }

  public class DetalleAsientoLocalAdded
  {
    public required int IdCuenta { get; set; }
    public required string IdAsiento { get; set; }
    public required string Glosa { get; set; }
    public required string Moneda { get; set; }
    public required double? DebeBs { get; set; }
    public required double? DebeSus { get; set; }
    public required double? HaberBs { get; set; }
    public required double? HaberSus { get; set; }
  }

  public class DetalleAsientoLocalModified : DetalleAsientoDTO
  {
    public required int Id { get; set; }
  }

  public class DetalleAsientoLocalDTO
  {
    public required List<DetalleAsientoLocalAdded> Added { get; set; }
    public required List<DetalleAsientoLocalModified> Updated { get; set; }
    public required List<DetalleAsientoLocalModified> Deleted { get; set; }
  }
}
