using server.Dtos;
using server.Models;

namespace server.Responses
{
    public class RiAccesoModeloRes : BaseRes
    {
        public required int Id { get; set; }
        public required int IdGrupo { get; set; }
        public required int IdModelo { get; set; }
        public required string NombreModelo { get; set; }
        public required bool Ver { get; set; }
        public required bool Crear { get; set; }
        public required bool Editar { get; set; }
        public required bool Eliminar { get; set; }
    }

    public class MenuAccesoRes:BaseRes
    {
        public required int IdMenu { get; set; }
        public required List<AccesoaRes> Accesos { get; set; }
    }
    
    public class AccesoaRes 
    {
        public required int IdModelo { get; set; }
        public required bool Ver { get; set; }
        public required bool Crear { get; set; }
        public required bool Editar { get; set; }
        public required bool Eliminar { get; set; }
        public required string Estado { get; set; }

    }
}
