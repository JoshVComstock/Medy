namespace server.Models
{
  public class Ciudad : Base
  {
    public required string Nombre { get; set; }
    public List<Provincia> Provincia { get; set; } = new List<Provincia>();

  }
}