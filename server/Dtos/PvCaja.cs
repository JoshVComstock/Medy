using System.ComponentModel.DataAnnotations;
using Swashbuckle.AspNetCore.Annotations;


namespace server.Dtos
{
    public class PvCajaDTO
    {
   
        public int? Id { get; set; } = null!;
        public required int IdEfectivo { get; set; }
        public required int Cantidad { get; set; }

        /*   public required int Valor { get; set; } */
        /*      public required DateOnly Fecha { get; set; } */
        /*     public required string Tipo { get; set; } */
    }
}
