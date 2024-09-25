
using server.Models;

namespace server.Seeds
{
    public static class Seeds_ControlCartilla
    {

        public static RiMenu MenuHospitalCartilla = new()
        {
            Nombre = "Hospital cartilla",
            Accion = "/dashboard/hospital-cartilla",
            Padre = Seeds_RiMenu.MenuControlCartillaPadre,
            PathIcono = null,
            PathPadre = "",
            Secuencia = 1,
        };
        public static RiMenu MenuProvinciaCartilla = new()
        {
            Nombre = "Provincia cartilla",
            Accion = "/dashboard/provincia-cartilla",
            Padre = Seeds_RiMenu.MenuControlCartillaPadre,
            PathIcono = null,
            PathPadre = "",
            Secuencia = 1,
        };
        public static RiMenu MenuFaltantes = new()
        {
            Nombre = "Faltantes",
            Accion = "/dashboard/faltantes",
            Padre = Seeds_RiMenu.MenuControlCartillaPadre,
            PathIcono = null,
            PathPadre = "",
            Secuencia = 1,
        };
        public static List<RiMenu> List = new List<RiMenu>()
    {
      MenuProvinciaCartilla,
      MenuHospitalCartilla,
      MenuFaltantes
    };
    }
}