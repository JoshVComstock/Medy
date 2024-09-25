namespace server.Responses
{
    public class CartillaRes : BaseRes
    {
        public required int Id { get; set; }
        public required string CodigoBarras { get; set; }
        public required DateOnly FechaTomaMuestras { get; set; }
        public required int NumeroMuestra { get; set; }
        public required bool? Transfucion { get; set; }
        public required string? Antibioticos { get; set; }
        public required string? Notas { get; set; }
        public required string Paciente {get;set;}
        public required string Sexo {get;set;}
    }
}