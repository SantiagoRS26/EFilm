namespace Business_Logic_Layer.Services
{
    using System;
    using System.Collections.Generic;
    using System.IdentityModel.Tokens.Jwt;
    using System.Linq;
    using System.Security.Claims;
    using System.Security.Cryptography;
    using System.Text;
    using System.Threading.Tasks;
    using Business_Logic_Layer.Interfaces;
    using Data_Access_Layer.Interfaces;
    using EFilm.Models;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using Microsoft.IdentityModel.Tokens;
    using Models;
    using Models.DTO;

    public class AuthService : IAuthService
    {
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IConfiguration configuration;
        private readonly IRefreshTokenRepository refreshTokenRepository;

        public AuthService(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager, IConfiguration configuration, IRefreshTokenRepository refreshTokenRepository)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.configuration = configuration;
            this.refreshTokenRepository = refreshTokenRepository;
        }

        public async Task<(string AccessToken, string RefreshToken)> LoginAsync(LoginModel model)
        {
            var user = await this.userManager.FindByEmailAsync(model.UserNameOrEmail) ??
                       await this.userManager.FindByNameAsync(model.UserNameOrEmail);

            if (user != null && await this.userManager.CheckPasswordAsync(user, model.Password))
            {
                var accessToken = this.GenerateJwtToken(user);
                var (refreshToken, tokenHash) = this.GenerateRefreshToken();

                var refreshTokenEntity = new RefreshToken
                {
                    TokenHash = tokenHash,
                    UserId = user.Id,
                    Expires = DateTime.UtcNow.AddDays(7),
                    Created = DateTime.UtcNow
                };

                await refreshTokenRepository.AddRefreshTokenAsync(refreshTokenEntity);
                await refreshTokenRepository.SaveChangesAsync();

                return (accessToken, refreshToken);
            }

            return (null, null);
        }


        private (string Token, string TokenHash) GenerateRefreshToken()
        {
            var randomBytes = RandomNumberGenerator.GetBytes(64);
            var refreshToken = Convert.ToBase64String(randomBytes);
            var tokenHash = this.ComputeHash(refreshToken);
            return (refreshToken, tokenHash);
        }

        private string ComputeHash(string input)
        {
            using (var sha256 = SHA256.Create())
            {
                var bytes = Encoding.UTF8.GetBytes(input);
                var hashBytes = sha256.ComputeHash(bytes);
                return Convert.ToBase64String(hashBytes);
            }
        }


        private string GenerateJwtToken(ApplicationUser user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                this.configuration["Jwt:Issuer"],
                this.configuration["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<(bool, string)> ExternalLoginCallbackAsync(string returnUrl = null, string remoteError = null)
        {
            if (remoteError != null)
            {
                return (false, $"Error from external provider: {remoteError}");
            }

            var info = await this.signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                return (false, nameof(this.LoginAsync));
            }

            var result = await this.signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: false);
            if (result.Succeeded)
            {
                return (true, returnUrl);
            }
            else
            {
                var email = info.Principal.FindFirstValue(ClaimTypes.Email);
                if (email != null)
                {
                    var user = await this.userManager.FindByEmailAsync(email);
                    if (user != null)
                    {
                        var identityResult = await this.userManager.AddLoginAsync(user, info);
                        if (identityResult.Succeeded)
                        {
                            await this.signInManager.SignInAsync(user, isPersistent: false);
                            return (true, returnUrl);
                        }
                    }
                }

                var userName = email;

                if (!string.IsNullOrEmpty(email))
                {
                    userName = email.Substring(0, email.IndexOf('@')).Replace(".", string.Empty).Replace(" + ", string.Empty).Replace("_", string.Empty).Replace("-", string.Empty);
                }

                var newUser = new ApplicationUser
                {
                    UserName = userName,
                    Email = info.Principal.FindFirstValue(ClaimTypes.Email),
                    FirstName = info.Principal.FindFirstValue(ClaimTypes.GivenName),
                    LastName = info.Principal.FindFirstValue(ClaimTypes.Surname),
                    ProfilePicturePath = info.Principal.FindFirstValue("picture"),
                };

                var createUserResult = await this.userManager.CreateAsync(newUser);
                if (createUserResult.Succeeded)
                {
                    createUserResult = await this.userManager.AddLoginAsync(newUser, info);
                    if (createUserResult.Succeeded)
                    {
                        await this.signInManager.SignInAsync(newUser, isPersistent: false);
                        return (true, returnUrl);
                    }
                }

                return (false, "Error creating user with external login.");
            }
        }

        public async Task<(bool Success, string AccessToken, string RefreshToken, string ErrorMessage)> RegisterAsync(RegisterModel model)
        {
            var user = new ApplicationUser
            {
                UserName = model.UserName,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                ProfilePicturePath = model.ProfilePicturePath
            };

            var result = await userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                var (accessToken, refreshToken) = await LoginAsync(new LoginModel { UserNameOrEmail = model.Email, Password = model.Password });

                if (accessToken != null)
                {
                    return (true, accessToken, refreshToken, null);
                }
                else
                {
                    return (false, null, null, "Error during login after registration.");
                }
            }

            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            return (false, null, null, errors);
        }


        public async Task<(string AccessToken, string RefreshToken)> RefreshTokenAsync(string token)
        {
            var tokenHash = this.ComputeHash(token);
            var refreshToken = await this.refreshTokenRepository.GetRefreshTokenByTokenHashAsync(tokenHash);

            if (refreshToken == null || !refreshToken.IsActive)
            {
                return (null, "Invalid token");
            }

            var user = refreshToken.User;

            var newAccessToken = GenerateJwtToken(user);
            var (newRefreshToken, newTokenHash) = GenerateRefreshToken();

            // Revoca el token anterior
            await this.refreshTokenRepository.RevokeRefreshTokenAsync(refreshToken);

            // Almacena el nuevo refresh token
            var newRefreshTokenEntity = new RefreshToken
            {
                TokenHash = newTokenHash,
                UserId = user.Id,
                Expires = DateTime.UtcNow.AddDays(7),
                Created = DateTime.UtcNow,
            };

            await this.refreshTokenRepository.AddRefreshTokenAsync(newRefreshTokenEntity);
            await this.refreshTokenRepository.SaveChangesAsync();

            return (newAccessToken, newRefreshToken);
        }

    }
}
