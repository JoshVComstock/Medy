
using server.Models;

namespace server.Seeds
{
  public static class Seeds_RiMenu
  {
    public static RiMenu MenuDashboardPadre = new()
    {
      Nombre = "Dashboard",
      Accion = null,
      IdPadre = null,
      PathIcono = "Dashboard",
      PathPadre = "",
      Secuencia = 1,
    };
    public static RiMenu MenuGestionClinicaPadre = new()
    {
      Nombre = "Gestion Clinica",
      Accion = null,
      IdPadre = null,
      PathIcono = "Gestion clinica",
      PathPadre = "",
      Secuencia = 1,
    };
    public static RiMenu MenuContactosPadre = new()
    {
      Nombre = "Contactos",
      Accion = null,
      IdPadre = null,
      PathIcono = "Contactos",
      PathPadre = "",
      Secuencia = 1,
    };

    public static RiMenu MenuRegionesPadre = new()
    {
      Nombre = "Regiones",
      Accion = null,
      IdPadre = null,
      PathIcono = "Regiones",
      PathPadre = "",
      Secuencia = 1,
    };
    public static RiMenu MenuControlCartillaPadre = new()
    {
      Nombre = "Control cartilla",
      Accion = null,
      IdPadre = null,
      PathIcono = "Control cartilla",
      PathPadre = "",
      Secuencia = 1,
    };

    public static RiMenu MenuLaboratorioPadre = new()
    {
      Nombre = "Laboratorio",
      Accion = null,
      IdPadre = null,
      PathIcono = "Laboratorio",
      PathPadre = "",
      Secuencia = 1,
    };
    public static RiMenu MenuReportesPadre = new()
    {
      Nombre = "Reportes",
      Accion = null,
      IdPadre = null,
      PathIcono = "Reportes",
      PathPadre = "",
      Secuencia = 1,
    };


    public static RiMenu MenuConfiguracionPadre = new()
    {
      Nombre = "Configuración",
      Accion = null,
      IdPadre = null,
      PathIcono = "Configuracion",
      PathPadre = "",
      Secuencia = 1,
    };
  
    public static List<RiMenu> List = new List<RiMenu>()
    {
      MenuContactosPadre,
      MenuLaboratorioPadre,
      MenuDashboardPadre,
      MenuConfiguracionPadre,
      MenuGestionClinicaPadre,
      MenuRegionesPadre,
      MenuControlCartillaPadre,
      MenuReportesPadre
    };
  }
}