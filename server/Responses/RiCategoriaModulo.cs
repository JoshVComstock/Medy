namespace server.Responses
{
    public class RiCategoriaModuloRes : BaseRes
    {
        public required int Id { get; set; }
        public required int IdPadre { get; set; }
        public required string Nombre { get; set; }
        public required string Descripcion { get; set; }
        public required int Secuencia { get; set; }
        public required bool Visible { get; set; }
        public required bool Exclusivo { get; set; }
    }
}
