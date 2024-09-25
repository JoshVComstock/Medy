using server.Models;

namespace server.Seeds
{
  public static class Seeds_ERP_ProdCategoria
  {
    public static ProdCategoria ProdCategoria1 = new()
    {
      Nombre = "Categoría 1",
      NombreCompleto = "Categoría de producto 1",
      PathPadre = "1",
      IdPadre = 1,
      MetodoEmbalaje = "Embalaje 1",
      IdEstrategiaEliminacion = 1,
    };

    public static List<ProdCategoria> List = new()
    {
      ProdCategoria1
    };
  }
}