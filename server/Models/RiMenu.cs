namespace server.Models
{
        public class RiMenu : Base
        {
                public int? IdPadre { get; set; }
                public required int Secuencia { get; set; }
                public required string? PathIcono { get; set; }
                public required string PathPadre { get; set; }
                public required string Nombre { get; set; }
                public required string? Accion { get; set; }
                public RiMenu? Padre { get; set; }
                public List<RiModelo> RiModelo { get; set; } = new List<RiModelo>();
                public List<RiMenuGrupoRel> RiMenuGrupoRel { get; set; } = new List<RiMenuGrupoRel>();
        }
}
