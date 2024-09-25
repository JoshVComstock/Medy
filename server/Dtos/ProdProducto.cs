namespace server.Dtos
{
    public class ProdProductoDTO 
    {
        public required string CodInterno { get; set; }
        public required string CodFabricante { get; set; }
        public required string CodBarras { get; set; }
        public required int Volumen { get; set; }
        public required int Peso { get; set; }
        public required string? PathImagen { get; set; }
    }
}
