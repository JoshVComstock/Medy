using server.Constants;

using System.Security;

namespace server.Dtos
{
    public class PvMovimientoDetalleMonedaDTO
    {
        public int? Id { get; set; }
        public required int IdEmpresa { get; set; }
        public required DateOnly Fecha { get; set; }
        public required int IdTipoEfectivo { get; set; }
        public required int Cantidad { get; set; }
        public required int MontoNumerico { get; set; }
        public required int IdTipoMovimiento { get; set; }
        public required int Ciclo { get; set; }

    }
}
