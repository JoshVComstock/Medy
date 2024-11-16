using server.Constants;
using server.Models;

namespace server.Seeds
{
  public static class Seeds_TipoUsuario
  {
    public static RecTipoUsuario TipoUsuarioData = new()
    {
      Descripcion = "Usuario",
      Estado = States.ACTIVE,
      FechaModificacion = DateTime.UtcNow,
      FechaCreacion = DateTime.UtcNow
    };

    public static List<RecTipoUsuario> List = new()
    {
      TipoUsuarioData
    };
  }
}