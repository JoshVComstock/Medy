
using server.Models;

namespace server.Seeds
{
    public static class Seeds_GestionResultados
    {
        public static RiMenu MenuPendientesEnvio = new()
        {
            Nombre = "Pendientes de envio",
            Accion = "/dashboard/pendientes-envio",
            Padre = Seeds_Laboratorio.MenuGestionResultados,
            PathIcono = null,
            PathPadre = "",
            Secuencia = 1
        };
        public static RiMenu MenuPendientesResultado = new()
        {
            Nombre = "Resultados pendientes",
            Accion = "/dashboard/pendientes-resultados",
            Padre = Seeds_Laboratorio.MenuGestionResultados,
            PathIcono = null,
            PathPadre = "",
            Secuencia = 1
        };
       /*  public static RiMenu MenuTodosResultados = new()
        {
            Nombre = "Todos los resultados",
            Accion = "/dashboard/todo-resultados",
            Padre = Seeds_Laboratorio.MenuGestionResultados,
            PathIcono = null,
            PathPadre = "",
            Secuencia = 1
        }; */

        public static List<RiMenu> List = new List<RiMenu>()
    {
       /*  MenuTodosResultados, */
        MenuPendientesResultado,
        MenuPendientesEnvio
    };
    }
}