using server.Constants;
using server.Models;

namespace server.Seeds
{
  public static class Seeds_ERP_RecUsuarioGrupo
  {
    public static RecUsuarioGrupo GrupoAdministradorTodos = new()
    {
      Grupo = Seeds_ERP_RecGrupo.GrupoTodos,
      Usuario = Seeds_ERP_RecUsuario.UsuarioAdministrador,
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