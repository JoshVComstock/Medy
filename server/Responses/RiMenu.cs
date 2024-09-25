using server.Models;

namespace server.Responses
{
    public class RiMenuRes : BaseRes
    {
        public required int Id { get; set; }
        public required int? IdPadre { get; set; }
        public required string? NombrePadre { get; set;}
        public required int Secuencia { get; set; }
        public required string? PathIcono { get; set; }
        public required string PathPadre { get; set; }
        public required string Nombre { get; set; }
        public required string? Accion { get; set; }
        public required List<RiModeloRes> Modelos { get; set; }
    }

    public class ChildLink
    {
        public required int Id { get; set; }
        public required string Nombre { get; set; }
        public required string Padre { get; set; }
        public required string? Accion { get; set; }
        public required List<ChildLink> Hijos { get; set; }
    }

    public class ParentLink
    {
        public required int Id { get; set; }
        public required string? Icon { get; set; }
        public required string Nombre { get; set; }
        public required List<ChildLink> Hijos { get; set; }
    }
}
