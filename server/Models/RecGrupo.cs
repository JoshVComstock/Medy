namespace server.Models
{
    public class RecGrupo : Base
    {
        public required int IdCategoria { get; set; }
        public required string Nombre { get; set; }
        public required string Descripcion { get; set; }
        public List<RiMenuGrupoRel> RiMenuGrupoRel { get; set; } = new List<RiMenuGrupoRel>();
        public List<RiAccesoModelo> RiAccesoModelo { get; set; } = new List<RiAccesoModelo>();
        public List<RecUsuarioGrupo> RecUsuarioGrupo { get; set; } = new List<RecUsuarioGrupo>();
    }
}
