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
        Task<(string AccessToken, string RefreshToken)> LoginAsync(LoginModel model);

        Task<(bool Success, string AccessToken, string RefreshToken, string ReturnUrlOrError)> ExternalLoginCallbackAsync(string returnUrl = null, string remoteError = null);

        Task<(bool Success, string AccessToken, string RefreshToken, string ErrorMessage)> RegisterAsync(RegisterModel model);

        Task<(string AccessToken, string RefreshToken)> RefreshTokenAsync(string token);
    }
}
