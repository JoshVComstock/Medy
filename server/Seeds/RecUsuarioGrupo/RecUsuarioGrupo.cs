using server.Constants;
using server.Models;

namespace server.Seeds
{
  public static class Seeds_UsuarioGrupo
  {
    public static RecUsuarioGrupo GrupoAdministradorTodos = new()
    {
      Grupo = Seeds_Grupo.GrupoTodos,
      Usuario = Seeds_Usuario.UsuarioAdministrador,
      Estado = States.ACTIVE,
      IdUsrCreacion = null,
      IdUsrModificacion = null
    };

    public static List<RecUsuarioGrupo> List = new()
    {
      GrupoAdministradorTodos
    };
  }
}