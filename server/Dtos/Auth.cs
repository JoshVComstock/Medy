namespace auth.Dtos
{
    public class RegisterDTO
    {
        public required string Login { get; set; }
        public required string Password { get; set; }
        public required string Telefono { get; set; }
    }

    public class LoginDTO
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }

    public class AuthUpdateDTO
    {
        public required string Login { get; set; }
        public required string Telefono { get; set; }
    }

    public class CambiarContraDTO
    {
        public required string Actual { get; set; }
        public required string Nueva { get; set; }
        public required string Confirmar { get; set; }
    }
}
