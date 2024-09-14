namespace Business_Logic_Layer.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using EFilm.Models;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Models.DTO;

    public interface IAuthService
    {
        Task<string> LoginAsync(LoginModel model);

        Task<(bool, string)> ExternalLoginCallbackAsync(string returnUrl, string remoteError);

        Task<(bool, string)> RegisterAsync(RegisterModel model);

        Task<(string, string)> RefreshTokenAsync(string token);
    }
}
