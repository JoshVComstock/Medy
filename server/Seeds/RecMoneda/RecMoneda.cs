using server.Constants;
using server.Models;


namespace server.Seeds
{
  public static class Seeds_ERP_RecMoneda
  {
    public static RecMoneda[] MonedaData = new RecMoneda[]
    {
    new RecMoneda
    {
        Codigo = "0202",
        Simbolo = "Bs",
        Nombre = "Boliviano",
        Decimales = 2,
        UnidadMonetaria = "1",
        SubUnidadMonetaria = "1",
        Redondeo = 8,
        Estado = States.ACTIVE,
        FechaModificacion = DateTime.UtcNow,
        FechaCreacion = DateTime.UtcNow
    },
    new RecMoneda
    {
        Codigo = "0101",
        Simbolo = "$",
        Nombre = "Dolar",
        Decimales = 6,
        UnidadMonetaria = "6.90",
        SubUnidadMonetaria = "6.91",
        Redondeo = 8,
        Estado = States.ACTIVE,
        FechaModificacion = DateTime.UtcNow,
        FechaCreacion = DateTime.UtcNow
    }
    };

    public static List<RecMoneda> List = new List<RecMoneda>(MonedaData);
  }
}