namespace server.Dtos
{
    public class ContableLibroDiarioDTO
    {
        public required DateOnly FechaInicio { get; set; }
        // public required string Visualizacion { get; set; }
        public required string Nombre { get; set; }
        public required string Descripcion { get; set; }
    }

    public class ContableLibroPrivadoImportantShareDTO
    {
        public required int Id { get; set; }
        // public required string Password { get; set; }
    }
}
