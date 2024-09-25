namespace server.Models
{
    public class RecContactoCategoriaRel : Base
    {
        public int IdContacto { get; set; }
        public int IdCategContacto { get; set; }
        public required RecContacto Contacto { get; set; }
        public required RecContactoCategoria ContactoCategoria { get; set; }
    }
}
