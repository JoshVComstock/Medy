
using server.Models;

namespace server.Seeds
{
  public static class Seeds_Laboratorio
  {
    public static RiMenu MenuResultado = new()
    {
      Nombre = "Nuevo resultado",
      Accion = "/dashboard/nuevo-resultado",
      Padre = Seeds_RiMenu.MenuLaboratorioPadre,
      PathIcono = null,
      PathPadre = "",
      Secuencia = 1
    };
    public static RiMenu MenuGestionResultados = new()
    {
      Nombre = "Gestion de resultados",
      Accion = "/dashboard/gestion-resultados",
      Padre = Seeds_RiMenu.MenuLaboratorioPadre,
      PathIcono = null,
      PathPadre = "",
      Secuencia = 1
    };

    public static List<RiMenu> List = new List<RiMenu>()
    {
        MenuGestionResultados,
        MenuResultado,
    };
  }
}