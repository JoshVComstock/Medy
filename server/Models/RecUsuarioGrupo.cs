namespace server.Models
{
    public class RecUsuarioGrupo : Base
    {
        public int IdUsuario { get; set; }
        public int IdGrupo { get; set; }
        public required RecGrupo Grupo { get; set; }
        public required RecUsuario Usuario { get; set; }
    }
}
