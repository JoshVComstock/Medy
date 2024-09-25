using server.Models;

namespace server.Seeds
{
  public static class Seeds_ERP_RiMenuGrupoRel
  {
    public static RiMenuGrupoRel RelTodosGrupos = new()
    {
      Grupo = Seeds_ERP_RecGrupo.GrupoTodos,
      Menu = Seeds_Configuracion.MenuConfiguracionGrupos
    };

    public static RiMenuGrupoRel RelTodosConfiguracion = new()
    {
      Grupo = Seeds_ERP_RecGrupo.GrupoTodos,
      Menu = Seeds_RiMenu.MenuConfiguracionPadre
    };

    public static List<RiMenuGrupoRel> List = new()
    {
      RelTodosGrupos,
      RelTodosConfiguracion
    };
  }
}