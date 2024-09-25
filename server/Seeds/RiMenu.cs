using server.Constants;
using server.Models;

namespace server.Seeds
{
  public static class RiMenuSeeds
  {
    public static RiMenu MenuContactosPadre = new()
    {
      Nombre = "Contactos",
      Accion = null,
      IdPadre = null,
      PathIcono = "Contactos",
      PathPadre = "",
      Secuencia = 1,
    };

    public static RiMenu MenuDashboardPadre = new()
    {
      Nombre = "Dashboard",
      Accion = null,
      IdPadre = null,
      PathIcono = "Dashboard",
      PathPadre = "",
      Secuencia = 7,
    };

    public static RiMenu MenuConfiguracionPadre = new()
    {
      Nombre = "Configuración",
      Accion = null,
      IdPadre = null,
      PathIcono = "Configuracion",
      PathPadre = "",
      Secuencia = 8,
    };

   

    public static RiMenu MenuContactos = new()
    {
      Nombre = "Contactos",
      Accion = "/dashboard/contactos",
      Padre = MenuContactosPadre,
      PathIcono = null,
      PathPadre = "",
      Secuencia = 2,
    };

    public static RiMenu MenuCategoriasDeContacto = new()
    {
      Nombre = "Categorías de contacto",
      Accion = "/dashboard/contactos-categorias",
      Padre = MenuContactosPadre,
      PathIcono = null,
      PathPadre = "",
      Secuencia = 3,
    };

    public static RiMenu MenuConfiguracionUsuarios = new()
    {
      Nombre = "Usuarios",
      Accion = "/dashboard/configuracion-usuarios",
      Padre = MenuConfiguracionPadre,
      PathIcono = null,
      PathPadre = "",
      Secuencia = 1,
    };

    public static RiMenu MenuConfiguracionGrupos = new()
    {
      Nombre = "Grupos",
      Accion = "/dashboard/configuracion-grupos",
      Padre = MenuConfiguracionPadre,
      PathIcono = null,
      PathPadre = "",
      Secuencia = 2,
    };

    public static RiMenu MenuConfiguracionMenus = new()
    {
      Nombre = "Menús",
      Accion = "/dashboard/configuracion-menus",
      Padre = MenuConfiguracionPadre,
      PathIcono = null,
      PathPadre = "",
      Secuencia = 3,
    };

    public static RiMenu MenuConfiguracionModelos = new()
    {
      Nombre = "Modelos",
      Accion = "/dashboard/configuracion-modelos",
      Padre = MenuConfiguracionPadre,
      PathIcono = null,
      PathPadre = "",
      Secuencia = 4,
    };
    public static List<RiMenu> List = new(){
      MenuContactosPadre,
      MenuDashboardPadre,
      MenuConfiguracionPadre,
      MenuContactos,
      MenuCategoriasDeContacto,
      MenuConfiguracionUsuarios,
      MenuConfiguracionGrupos,
      MenuConfiguracionMenus,
      MenuConfiguracionModelos,
    };
  }
}
