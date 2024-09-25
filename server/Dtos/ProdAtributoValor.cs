namespace server.Dtos
{
    public class ProdAtributoValorDTO
    {
        public required int IdAtributo { get; set; }
        public required string Nombre { get; set; }
        public required int Secuencia { get; set; }
        public required int Color { get; set; }
        public required string ColorHtml { get; set; }
        public required bool Personalizable { get; set; }
    }
}