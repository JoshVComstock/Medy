
using server.Models;

namespace server.Seeds
{
  public static class Seeds_Contacto
  {

    public static RiMenu MenuContactos = new()
    {
      Nombre = "Contactos",
      Accion = "/dashboard/contactos",
      Padre = Seeds_RiMenu.MenuContactosPadre,
      PathIcono = null,
      PathPadre = "",
      Secuencia = 1,
    };

    public static RiMenu MenuCategoriasDeContacto = new()
    {
      Nombre = "Categorías de contacto",
      Accion = "/dashboard/contactos-categorias",
      Padre = Seeds_RiMenu.MenuContactosPadre,
      PathIcono = null,
      PathPadre = "",
      Secuencia = 1,
    };
    public static List<RiMenu> List = new List<RiMenu>()
    {
      MenuCategoriasDeContacto,
      MenuContactos,
    };
  }
}