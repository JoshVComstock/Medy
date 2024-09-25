
using server.Models;

namespace server.Seeds
{
    public static class Seeds_Regiones
    {

        public static RiMenu MenuCiudades = new()
        {
            Nombre = "Ciudades",
            Accion = "/dashboard/ciudades",
            Padre = Seeds_RiMenu.MenuRegionesPadre,
            PathIcono = null,
            PathPadre = "",
            Secuencia = 1,
        };
        public static RiMenu MenuProvincias = new()
        {
            Nombre = "Provincias",
            Accion = "/dashboard/provincias",
            Padre = Seeds_RiMenu.MenuRegionesPadre,
            PathIcono = null,
            PathPadre = "",
            Secuencia = 1,
        };
        public static RiMenu MenuMunicipios = new()
        {
            Nombre = "Municipios",
            Accion = "/dashboard/municipios",
            Padre = Seeds_RiMenu.MenuRegionesPadre,
            PathIcono = null,
            PathPadre = "",
            Secuencia = 1,
        };
        public static RiMenu MenuCentros = new()
        {
            Nombre = "Centros",
            Accion = "/dashboard/centros",
            Padre = Seeds_RiMenu.MenuRegionesPadre,
            PathIcono = null,
            PathPadre = "",
            Secuencia = 1,
        };
        public static RiMenu MenuLaboratorio = new()
        {
            Nombre = "Laboratorio",
            Accion = "/dashboard/laboratorio",
            Padre = Seeds_RiMenu.MenuRegionesPadre,
            PathIcono = null,
            PathPadre = "",
            Secuencia = 1,
        };
        public static RiMenu MenuRed = new()
        {
            Nombre = "Red",
            Accion = "/dashboard/red",
            Padre = Seeds_RiMenu.MenuRegionesPadre,
            PathIcono = null,
            PathPadre = "",
            Secuencia = 1,
        };
        public static List<RiMenu> List = new List<RiMenu>()
    {
      MenuLaboratorio,
      MenuCentros,
      MenuProvincias,
      MenuMunicipios,
      MenuCiudades
    };
    }
}