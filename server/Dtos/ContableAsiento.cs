namespace server.Dtos
{
  public class AsientoDTO
  {
    public required int IdTipoComprobante { get; set; }
    public required string NumeroComprobante { get; set; }
    public required DateOnly Fecha { get; set; }
    public required string Concepto { get; set; }
  }

  public class AsientoLocalAdded : AsientoDTO
  {
    public required string Id { get; set; }
  }

  public class AsientoLocalModified : AsientoDTO
  {
    public required int Id { get; set; }
  }

  public class AsientoLocalDTO
  {
    public required List<AsientoLocalAdded> Added { get; set; }
    public required List<AsientoLocalModified> Updated { get; set; }
    public required List<AsientoLocalModified> Deleted { get; set; }
  }

  public class AsientoDetallesLocalDTO
  {
    public required AsientoLocalDTO Asientos { get; set; }
    public required DetalleAsientoLocalDTO Detalles { get; set; }
  }
}
