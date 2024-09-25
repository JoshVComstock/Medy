using System.Globalization;
using System.Text.RegularExpressions;

namespace server.Utils
{
    public static class GetNumberOfString
    {
        public static double CalculateMonto(string descripcion, double cantidad)
        {
            Match match = Regex.Match(descripcion, @"\d+(\.\d+)?");
            double monto = 0;
            if (match.Success)
            {
                double number = Convert.ToDouble(match.Value, CultureInfo.InvariantCulture);
                monto = number * cantidad;
            }
            return monto;
        }
    }
}