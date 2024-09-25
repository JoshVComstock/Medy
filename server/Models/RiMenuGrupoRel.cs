namespace server.Models
{
    public class RiMenuGrupoRel : Base
    {
        public int IdMenu { get; set; }
        public int IdGrupo { get; set; }
        public required RiMenu Menu { get; set; }
        public required RecGrupo Grupo { get; set; }
    }
}
