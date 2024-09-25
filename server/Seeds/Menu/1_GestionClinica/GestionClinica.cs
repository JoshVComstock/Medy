
using server.Models;

namespace server.Seeds
{
    public static class Seeds_GestionClinica
    {


        public static RiMenu MenuCartilla = new()
        {
            Nombre = "Cartilla",
            Accion = "/dashboard/cartilla",
            Padre = Seeds_RiMenu.MenuGestionClinicaPadre,
            PathIcono = null,
            PathPadre = "",
            Secuencia = 1,
        };
        public static RiMenu MenuPacientes = new()
        {
            Nombre = "Pacientes",
            Accion = "/dashboard/pacientes",
            Padre = Seeds_RiMenu.MenuGestionClinicaPadre,
            PathIcono = null,
            PathPadre = "",
            Secuencia = 1,
        };
        public static List<RiMenu> List = new List<RiMenu>()
        {
        MenuCartilla,
        MenuPacientes
        };
    }
}