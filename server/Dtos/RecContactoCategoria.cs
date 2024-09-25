namespace server.Dtos
{
    public class RecContactoCategoriaDTO
    {
        public required int IdPadre { get; set; }
        public required string Nombre { get; set; }
        public required string PathPadre { get; set; }
        public required int Color { get; set; }
    }
}
