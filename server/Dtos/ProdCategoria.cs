namespace server.Dtos
{
    public class ProdCategoriaDTO
    {
        public required int IdPadre { get; set; }
        public required string Nombre { get; set; }
        public required string NombreCompleto { get; set; }
        public required string PathPadre { get; set; }
        public required int IdEstrategiaEliminacion { get; set; }
        public required string MetodoEmbalaje { get; set; }
    }
}

