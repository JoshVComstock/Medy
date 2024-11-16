using server.Constants;

using System.Security;

namespace server.Responses
{
    public class PvConfigRes : BaseRes
    {
        public required int Id { get; set; }
        public required string Nombre { get; set; }
        public required int LimiteProducto { get; set; }
        public required int LimiteContactos { get; set; }
        public int? IdEmpresa { get; set; }
        public required int IdTipoTerminal { get; set; }

    }
}
