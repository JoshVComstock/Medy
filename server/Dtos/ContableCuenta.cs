namespace server.Dtos
{
    public class CuentaDTO
    {
        public required string Codigo { get; set; }
        public required string Descripcion { get; set; }
        public required int Nivel { get; set; }
        public required string Padre { get; set; }
        public required string Moneda { get; set; }
    }
}
