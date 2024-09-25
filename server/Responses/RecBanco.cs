using server.Constants;

using System.Security;

namespace server.Responses
{
    public class RecBancoRes : BaseRes
    {
        public required int Id { get; set; }
        public required string Nombre { get; set; }
        public required string Direccion { get; set; }
        public required string Direccion2 { get; set; }
        public required string CodigoPostal { get; set; }
        public required string Ciudad { get; set; }
        public required string Email { get; set; }
        public required string Telefono { get; set; }
    }
}
