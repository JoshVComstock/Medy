namespace server.Dtos
{
    public class InvUbicacionDTO 
    {
        public required int IdPadre { get; set; }
        public required int IdEmpresa { get; set; }
        public required int IdAlmacen { get; set; }
        public required int IdTipoUbicacion { get; set; }
        public required string Nombre { get; set; }
        public required string NombreCompleto { get; set; }
        public required string PathPadre { get; set; }
        public required string Codigo { get; set; }
        public required DateOnly FechaUltInventario { get; set; }
        public required DateOnly FechaSigInventario { get; set; }
        public required string Nota { get; set; }
        public required bool UbicacionDeChatarra { get; set; }
        public required bool UbicacionDeDevolucion { get; set; }
    }
}