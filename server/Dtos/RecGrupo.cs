using server.Models;

namespace server.Dtos
{
    public class RecGrupoDTO
    {
        public required int IdCategoria { get; set; }
        public required string Nombre { get; set; }
        public required string Descripcion { get; set; }

    }
}
