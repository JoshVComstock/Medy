namespace server.Responses
{
    public class UmCategoriaRes : BaseRes
    {
        public required int Id { get; set; }
        public required string Nombre { get; set; }
        public required bool Agrupable { get; set; }
    }
    public class UmCategoriaInfoRes 
    {
        public required int Id { get; set; }
        public required string Nombre { get; set; }
        public required bool Agrupable { get; set; }
    }
}
