namespace server.Models
{
    public class UmCategoria : Base
    {
        public required string Nombre { get; set; }
        public required bool Agrupable { get; set; }
        public List<UmUnidadMedida> UmUnidadMedida { get; set; } = new List<UmUnidadMedida>();
    }
}
