namespace server.Responses
{
    public class BaseRes
    {
        public required int? IdUsrCreacion { get; set; }
        public required int? IdUsrModificacion { get; set; }
        public required string Estado { get; set; }
        public required DateTime? FechaModificacion { get; set; }
        public required DateTime? FechaCreacion { get; set; }
    }
}
