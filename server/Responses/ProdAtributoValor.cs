namespace server.Responses
{

    public class ProdAtributoValorRelationalRes
    {
        public required int IdAtributo { get; set; }
        public required int IdAtribValor { get; set; }
        public required int PrecioExtra { get; set; }
    }

    public class ProdAtributoValorRes : BaseRes
    {
        public required int Id { get; set; }
        public required ProdAtributoRes Atributo { get; set; }
        public int? IdAtributo { get; set; }
        public required string Nombre { get; set; }
        public required int Secuencia { get; set; }
        public required int Color { get; set; }
        public required string ColorHtml { get; set; }
        public required bool Personalizable { get; set; }

    }
}
