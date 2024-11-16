using server.Models;

namespace server.Seeds
{
  public static class Seeds_AccesoModelo
  {
    public static RiAccesoModelo RelTodosGruposModelo = new()
    {
      Grupo = Seeds_Grupo.GrupoTodos,
      Modelo = Seeds_Modelo.RiModeloGrupos,
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