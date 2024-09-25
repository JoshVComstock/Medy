
using server.Models;

namespace server.Seeds
{
    public static class Seeds_Reportes
    {

        public static RiMenu MenuReportes = new()
        {
            Nombre = "Reportes",
            Accion = "/dashboard/reportes",
            Padre = Seeds_RiMenu.MenuReportesPadre,
            PathIcono = null,
            PathPadre = "",
            Secuencia = 1,
        };

        public static List<RiMenu> List = new List<RiMenu>()
    {
      MenuReportes,
    };
    }
}