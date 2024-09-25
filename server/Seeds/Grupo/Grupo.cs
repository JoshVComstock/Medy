using server.Models;

namespace server.Seeds
{
  public static class Seeds_ERP_Grupo
  {
    public static RecGrupo Todo = new()
    {
      Nombre = "Todo",
      Descripcion = "Puede realizar todas las acciones",
      IdCategoria = 1
    };

    public static List<RecGrupo> List = new()
    {
      Todo
    };
  }
}