namespace server.Dtos
{
    public class InvAlmacenDTO
    {
        public int IdEmpresa { get; set; }
        public int IdContacto { get; set; }
        public int Secuencia { get; set; }
        public required string Nombre { get; set; }
        public required string Codigo { get; set; }
        public required string ReabastecerDe { get; set; }
        public required string NacEstado { get; set; }
        public required bool Reabastecer { get; set; }
    }
}