namespace server.Models
{
    public class RecTipoUsuario : Base
    {
        public required string Descripcion { get; set; }
        public List<RecUsuario> RecUsuario { get; set; } = new List<RecUsuario>();
    }
}
