using server.Constants;

using System.Security;

namespace server.Dtos
{
    public class PvMovimientoDTO
    {
        public required int IdEmpresa { get; set; }
        public required string Descripcion { get; set; }
        public required int Monto { get; set; }
        public required int IdTipoMovimiento { get; set; }
        public required List<PvMovimientoDetalleMonedaDTO> MovimientoDetalle { get; set; }

    }
}
