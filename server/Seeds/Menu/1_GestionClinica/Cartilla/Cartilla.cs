
using server.Models;

namespace server.Seeds
{
    public static class Seeds_Cartilla
    {
        public static RiMenu MenuCartilla = new()
        {
            Nombre = "Nueva cartilla",
            Accion = "/dashboard/nueva-cartilla",
            Padre = Seeds_GestionClinica.MenuCartilla,
            PathIcono = null,
            PathPadre = "",
            Secuencia = 1,
        };
        public static RiMenu MenuTodosCartillas = new()
        {
            Nombre = "Todos cartilla",
            Accion = "/dashboard/todos-cartilla",
            Padre = Seeds_GestionClinica.MenuCartilla,
            PathIcono = null,
            PathPadre = "",
            Secuencia = 1,
        };
        public static List<RiMenu> List = new List<RiMenu>()
        {
        MenuCartilla,
        MenuTodosCartillas
        };
    }
}