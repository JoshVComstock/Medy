namespace server.Responses
{
    public class AtributosForProduct
    {
        public required string Nombre { get; set; }
        public required int IdAtributoValor { get; set; }
        public required int IdAtributo { get; set; }
    }
    public class ProdProductoRes : BaseRes
    {
        public int Id { get; set; }
        public int IdProdBase { get; set; }
        public required string CodInterno { get; set; }
        public required string CodFabricante { get; set; }
        public required string CodBarras { get; set; }
        public required int Volumen { get; set; }
        public required int Peso { get; set; }
        public required string? PathImagen { get; set; }
        public required string Nombre { get; set; }
        public required string Descripcion { get; set; }
        public required List<AtributosForProduct> Atributos { get; set; }
    }
}
