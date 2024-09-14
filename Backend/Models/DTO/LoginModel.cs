namespace EFilm.Models
{
    public class LoginModel
    {
        public string UserNameOrEmail { get; set; }

        public string? RememberMe { get; set; }

        public string Password { get; set; }
    }
}
