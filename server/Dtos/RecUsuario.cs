namespace server.Dtos
{
    public class RecUsuarioDTO
    {
        public required int IdTipoUsuario { get; set; }
        // public required int IdEmpresa { get; set; }
        public required int IdContacto { get; set; }
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
    }
    public class RecUsuarioGruposDTO
    {
        public required List<int> Idsgrupo { get; set; }
    }
}
