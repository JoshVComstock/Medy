using server.Models;

namespace server.Seeds
{
  public static class Seeds_ERP_RiAccesoModelo
  {
    public static RiAccesoModelo RelTodosGruposModelo = new()
    {
      Grupo = Seeds_ERP_RecGrupo.GrupoTodos,
      Modelo = Seeds_ERP_RiModelo.RiModeloGrupos,
      Crear = true,
      Editar = true,
      Eliminar = true,
      Ver = true
    };

    public static List<RiAccesoModelo> List = new()
    {
      RelTodosGruposModelo
    };
  }
}