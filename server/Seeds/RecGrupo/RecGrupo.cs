using server.Constants;
using server.Models;

namespace server.Seeds
{
  public static class Seeds_Grupo
  {
    public static RecGrupo GrupoTodos = new()
    {
      IdCategoria = 1,
      Nombre = "Todos",
      Descripcion = "Puede hacer todo",
      FechaCreacion = DateTime.UtcNow,
      FechaModificacion = DateTime.UtcNow,
      Estado = States.ACTIVE,
      IdUsrCreacion = 1,
      IdUsrModificacion = null
    };

    public static List<RecGrupo> List = new()
    {
      GrupoTodos
    };
  }
}