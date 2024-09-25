namespace server.Models
{
    public class RecUsuario : Base
    {
        public int? IdTipoUsuario { get; set; }
        // public int? IdEmpresa { get; set; }
        public int? IdContacto { get; set; }
        public required int IdAccion { get; set; }
        public required string Telefono { get; set; }
        public required string Login { get; set; }
        public required string Password { get; set; }
        public string? CodigoSecreto { get; set; }
        public string? Firma { get; set; }
        public string? Notificacion { get; set; }
        public string? EstadoBot { get; set; }
        public string? CodigoBot { get; set; }
        public required bool Activo { get; set; }
        public List<RecUsuarioGrupo> RecUsuarioGrupo { get; set; } = new List<RecUsuarioGrupo>();
        public RecTipoUsuario? TipoUsuario { get; set; }
        public RecContacto? Contacto { get; set; }


    }
}