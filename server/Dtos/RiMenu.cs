namespace server.Dtos
{
    public class RiMenuDTO
    {
        public required string IdPadre { get; set; }
        public required int Secuencia { get; set; }
        public required string? PathIcono { get; set; }
        public required string PathPadre { get; set; }
        public required string Nombre { get; set; }
        public required string? Accion { get; set; }
    }
    public class MenuAccesoDTO
    {
            public required int IdMenu { get; set; }
            public required List<AccesoDTO> Accesos { get; set; }
    }

}
