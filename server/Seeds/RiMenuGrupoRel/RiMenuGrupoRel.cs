using server.Models;

namespace server.Seeds
{
  public static class Seeds_MenuGrupoRel
  {
    public static RiMenuGrupoRel RelTodosGrupos = new()
    {
      Grupo = Seeds_Grupo.GrupoTodos,
      Menu = Seeds_Configuracion.MenuConfiguracionGrupos
    };

    public static RiMenuGrupoRel RelTodosConfiguracion = new()
    {
      Grupo = Seeds_Grupo.GrupoTodos,
      Menu = Seeds_RiMenu.MenuConfiguracionPadre
    };

    public static List<RiMenuGrupoRel> List = new()
    {
      RelTodosGrupos,
      RelTodosConfiguracion
    };
  }
}