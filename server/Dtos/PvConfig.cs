using server.Constants;

using System.Security;

namespace server.Dtos
{
    public class PvConfigDTO
    {
        public required string Nombre { get; set; }
        public required int LimiteProducto { get; set; }
        public required int LimiteContactos { get; set; }
        public required int IdEmpresa { get; set; }
        public required int IdTipoTerminal { get; set; }

    }
}
