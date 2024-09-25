using server.Constants;

using System.Security;

namespace server.Models
{
    public class RecContactoBanco : Base
    {
        public int? IdContacto { get; set; }
        public int? IdBanco { get; set; }
        public int? IdMoneda { get; set; }
        public int? IdEmpresa { get; set; }
        public required string NumeroCuenta { get; set; }
        public required RecContacto Contacto { get; set; }
        public required RecBanco Banco { get; set; }
        public required RecMoneda Moneda { get; set; }
        public required RecEmpresa Empresa { get; set; }

    }
}
