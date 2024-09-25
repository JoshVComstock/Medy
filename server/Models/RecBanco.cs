using server.Constants;

using System.Security;

namespace server.Models
{
    public class RecBanco : Base
    {
        public required string Nombre { get; set; }
        public required string Direccion { get; set; }
        public required string Direccion2 { get; set; }
        public required string CodigoPostal { get; set; }
        public required string Ciudad { get; set; }
        public required string Email { get; set; }
        public required string Telefono { get; set; }
        public List<RecContactoBanco> RecContactoBanco { get; set; } = new List<RecContactoBanco>();

    }
}
