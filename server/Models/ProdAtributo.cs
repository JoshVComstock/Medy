namespace server.Models
{
    public class ProdAtributo :Base
    {
        public required int Secuencia { get; set; }
        public required string Nombre { get; set; }
        public required string TipoVisualizacion { get; set; }
        public required string ModoCreacion { get; set; }
        public List<ProdAtributoValor> ProdAtributoValor { get; set; } = new List<ProdAtributoValor>();

    }
}
