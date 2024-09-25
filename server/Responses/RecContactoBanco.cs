using server.Constants;
using System.Security;
namespace server.Responses
{
    public class RecContactoBancoRes : BaseRes
    {
        public required int Id { get; set; }
        public required RecContactoRes Contacto { get; set; }
        public int? IdContacto { get; set; }
        public required RecBancoRes Banco { get; set; }
        public int? IdBanco { get; set; }
        public required RecMonedaRes Moneda { get; set; }
        public int? IdMoneda { get; set; }
        public required RecEmpresaInfoRes Empresa { get; set; }
        public int? IdEmpresa { get; set; }
        public required string NumeroCuenta { get; set; }
    }
}
