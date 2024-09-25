namespace server.Responses
{
    public class LaboratorioRes : BaseRes
    {
        public required int Id { get; set; }
        public required string Nombre { get; set; }
        public required string Direccion { get; set; }
        public required int Telefono { get; set; }
        public required int IdProvincia { get; set; }
        public required string Provincia { get; set; }

    }
}