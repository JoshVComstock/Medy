namespace server.Responses
{
    public class UmUnidadMedidaRes : BaseRes
    {
        public required int Id { get; set; }
        public required UmCategoriaRes Categoria { get; set; }
        public int? IdCategoria { get; set; }
        public required string Nombre { get; set; }
        public required string Tipo { get; set; }
        public required decimal Ratio { get; set; }
        public required decimal Redondeo { get; set; }
    }
    
}
