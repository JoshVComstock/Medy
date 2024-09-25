namespace server.Responses
{
  public class BancoRes : BaseRes
  {
    public required int Id { get; set; }
    public required int IdCuenta { get; set; }
    public required string NumeroCuenta { get; set; }
    public required string Nombre { get; set; }
  }
}
