using server.Constants;

namespace server.Models
{
  public class Base
  {
    public int Id { get; set; }
    public string Estado { get; set; } = States.ACTIVE;
    public int? IdUsrCreacion { get; set; }
    public int? IdUsrModificacion { get; set; }
    public DateTime FechaModificacion { get; set; }
    public DateTime FechaCreacion { get; set; }

  }
}
