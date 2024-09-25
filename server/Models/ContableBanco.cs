namespace server.Models
{
    public class ContableBanco : Base
    {
      public int IdCuenta { get; set; }
      public required string NumeroCuenta { get; set; }
      public required string Nombre { get; set; }
    }
}