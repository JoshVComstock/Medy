using server.Constants;
using System.Security;

namespace server.Models
{
    public class RecContactoCategoria : Base
    {
        public required int IdPadre { get; set; }
        public required string Nombre { get; set; }
        public required string PathPadre { get; set; }
        public required int Color { get; set; }
        public List<RecContactoCategoriaRel> ContactoCategoriaRel { get; set; } = new List<RecContactoCategoriaRel>();
    }
}
