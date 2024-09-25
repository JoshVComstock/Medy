namespace server.Responses
{
    public class RecContactoCategoriaRes : BaseRes
    {
        public required int Id { get; set; }
        public required int IdPadre { get; set; }
        public required string Nombre { get; set; }
        public required string PathPadre { get; set; }
        public required int Color { get; set; }
    }
}
