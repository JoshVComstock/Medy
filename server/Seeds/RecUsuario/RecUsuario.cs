using server.Constants;
using server.Models;

namespace server.Seeds
{
  public static class Seeds_ERP_RecUsuario
  {
    
    public static RecUsuario UsuarioAdministrador = new()
    {
      TipoUsuario = Seeds_ERP_RecTipoUsuario.TipoUsuarioData,
      // IdEmpresa = null,
      IdContacto = null,
      IdAccion = 1,
      Telefono = "987654321",
      Login = "admin",
      Password = "$2b$10$HLRudu6YULNxULnFE4o3AeohXd3/dDclz3eVYP8kuvDIHQg4/.N02", //123456
      CodigoSecreto = null,
      Firma = null,
      Notificacion = null,
      EstadoBot = null,
      CodigoBot = null,
      Activo = true,
      Estado = States.ACTIVE,
      IdUsrCreacion = null,
      IdUsrModificacion = null
    };

    public static List<RecUsuario> List = new()
    {
      UsuarioAdministrador
    };
  }
}