namespace server.Models
{
    public class ProdAtributoValor :Base
    {
        public int IdAtributo { get; set; }
        public required string Nombre { get; set; }
        public required int Secuencia { get; set; }
        public required int Color { get; set; }
        public required string ColorHtml { get; set; }
        public required bool Personalizable { get; set; }
        public required ProdAtributo Atributo { get; set; }
        public List<ProdBaseAtribValorRel> ProdBaseAtribValorRel { get; set; } = new List<ProdBaseAtribValorRel>();
    }
}
