namespace server.Responses
{
    public class ProdAtributoRes:BaseRes
    {
        public required int Id { get; set; }
        public required int Secuencia { get; set; }
        public required string Nombre { get; set; }
        public required string TipoVisualizacion { get; set; }
        public required string ModoCreacion { get; set; }

    }
}
