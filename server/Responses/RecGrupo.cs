namespace server.Responses
{
    public class RecGrupoRes : BaseRes
    {
        public required int Id { get; set; }
        public required int IdCategoria { get; set; }
        public required string Nombre { get; set; }
        public required string Descripcion { get; set; }
        public required List<RiMenuRes> Menus { get; set; }
        public required List<RiAccesoModeloRes> Accesos { get; set; }
    }
    public class AccesoRes
    {
        public required bool Ver { get; set; }
        public required bool Agregar { get; set; }
        public required bool Editar { get; set; }
        public required bool Eliminar { get; set; }
        public required int IdModelo { get; set; }
    }
}
