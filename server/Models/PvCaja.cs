using server.Constants;
using Swashbuckle.AspNetCore.Annotations;
using System.Security;

namespace server.Models
{
    public class PvCaja : Base
    {
        public int? IdMoneda { get; set; }
        public int? IdEfectivo { get; set; }

        public required double Valor { get; set; }
        public required string Descripcion { get; set; }
        public required int Cantidad { get; set; }
        public required DateOnly Fecha { get; set; }
        public required string Tipo { get; set; }
        /*         public required RecMoneda Moneda { get; set; } */
        public required PvEfectivo Efectivo { get; set; }
    }
}
