using server.Constants;

using System.Security;

namespace server.Dtos
{
    public class RecContactoBancoDTO
    {
        public required int IdContacto { get; set; }
        public required int IdBanco { get; set; }
        public required int IdMoneda { get; set; }
        public required int IdEmpresa { get; set; }
        public required string NumeroCuenta { get; set; }
    }
}
