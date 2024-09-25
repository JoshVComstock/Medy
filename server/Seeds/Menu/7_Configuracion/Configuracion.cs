using server.Models;

namespace server.Seeds
{
  public static class Seeds_Configuracion
  {
    public static RiMenu MenuConfiguracionUsuarios = new()
    {
      Nombre = "Usuarios",
      Accion = "/dashboard/configuracion-usuarios",
      Padre = Seeds_RiMenu.MenuConfiguracionPadre,
      PathIcono = null,
      PathPadre = "",
      Secuencia = 1,
    };

    public static RiMenu MenuConfiguracionGrupos = new()
    {
      Nombre = "Grupos",
      Accion = "/dashboard/configuracion-grupos",
      Padre = Seeds_RiMenu.MenuConfiguracionPadre,
      PathIcono = null,
      PathPadre = "",
      Secuencia = 1,
    };

    public static RiMenu MenuConfiguracionMenus = new()
    {
      Nombre = "Menús",
      Accion = "/dashboard/configuracion-menus",
      Padre = Seeds_RiMenu.MenuConfiguracionPadre,
      PathIcono = null,
      PathPadre = "",
      Secuencia = 1,
    };

    public static RiMenu MenuConfiguracionModelos = new()
    {
      Nombre = "Modelos",
      Accion = "/dashboard/configuracion-modelos",
      Padre = Seeds_RiMenu.MenuConfiguracionPadre,
      PathIcono = null,
      PathPadre = "",
      Secuencia = 1,
    };

    public static List<RiMenu> List = new List<RiMenu>()
    {
        MenuConfiguracionUsuarios,
        MenuConfiguracionGrupos,
        MenuConfiguracionMenus,
        MenuConfiguracionModelos,
    };
  }
}