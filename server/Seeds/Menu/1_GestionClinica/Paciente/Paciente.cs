
using server.Models;

namespace server.Seeds
{
    public static class Seeds_Pacientes
    {
        public static RiMenu MenuPacientePositivo = new()
        {
            Nombre = "Pacientes positivos",
            Accion = "/dashboard/paciente-positivo",
            Padre = Seeds_GestionClinica.MenuPacientes,
            PathIcono = null,
            PathPadre = "",
            Secuencia = 1,
        };
        public static RiMenu MenuPacienteNegativo = new()
        {
            Nombre = "Pacientes negativos",
            Accion = "/dashboard/paciente-negativo",
            Padre = Seeds_GestionClinica.MenuPacientes,
            PathIcono = null,
            PathPadre = "",
            Secuencia = 1,
        };
        /*      public static RiMenu MenuTodosPacientes = new()
             {
                 Nombre = "Todos",
                 Accion = "/dashboard/paciente-todos",
                 Padre = Seeds_GestionClinica.MenuPacientes,
                 PathIcono = null,
                 PathPadre = "",
                 Secuencia = 1,
             }; */
        public static List<RiMenu> List = new List<RiMenu>()
        {
        MenuPacienteNegativo,
        MenuPacientePositivo,
        /* MenuTodosPacientes */
        };
    }
}