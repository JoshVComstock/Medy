using server.Models;

namespace server.Responses
{
    public class RecUsuarioRes : BaseRes
    {
        public required int Id { get; set; }
        public required int IdTipoUsuario { get; set; }
        public required string NombreTipoUsuario { get; set; }
        public int? IdEmpresa { get; set; }
        public int? IdContacto { get; set; }
        public required string NombreContacto { get; set; }
        public required int IdAccion { get; set; }
        public required string Telefono { get; set; }
        public required string Login { get; set; }
        public required string Password { get; set; }
        public required string? CodigoSecreto { get; set; }
        public required string? Firma { get; set; }
        public required string? Notificacion { get; set; }
        public required string? EstadoBot { get; set; }
        public required string? CodigoBot { get; set; }
        public required bool Activo { get; set; }
        public required List<RecGrupoRes> Grupos { get; set; }
    }
    public class RecUsuarioSimpleRes
    {
        public required int Id { get; set; }
        public required string Login { get; set; }
    }
}
