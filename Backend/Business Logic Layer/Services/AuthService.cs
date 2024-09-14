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

        public async Task<string> LoginAsync(LoginModel model)
        {
            var user = await this.userManager.FindByEmailAsync(model.UserNameOrEmail);
            if (user == null)
            {
                user = await this.userManager.FindByNameAsync(model.UserNameOrEmail);
            }

            if (user != null && await this.userManager.CheckPasswordAsync(user, model.Password))
            {
                var token = GenerateJwtToken(user);
                var refreshToken = GenerateRefreshToken();
                refreshToken.UserId = user.Id;

                await this.refreshTokenRepository.AddRefreshTokenAsync(refreshToken);
                await this.refreshTokenRepository.SaveChangesAsync();

                return token;
            }

            return null;
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

        private RefreshToken GenerateRefreshToken()
        {
            return new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.UtcNow.AddDays(7),
                Created = DateTime.UtcNow
            };
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

        public async Task<(bool, string)> RegisterAsync(RegisterModel model)
        {
            var user = new ApplicationUser
            {
                UserName = model.UserName,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                ProfilePicturePath = model.ProfilePicturePath
            };

            var result = await this.userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                var token = await this.LoginAsync(new LoginModel { UserNameOrEmail = model.Email, Password = model.Password });
                return (true, token);
            }

            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            return (false, errors);
        }

        public async Task<(string, string)> RefreshTokenAsync(string token)
        {
            var refreshToken = await this.refreshTokenRepository.GetRefreshTokenByTokenAsync(token);

            if (refreshToken == null || !refreshToken.IsActive)
            {
                return (null, "Invalid token");
            }

            var user = await this.userManager.FindByIdAsync(refreshToken.UserId);

            var newJwtToken = GenerateJwtToken(user);
            var newRefreshToken = GenerateRefreshToken();
            newRefreshToken.UserId = user.Id;

            await this.refreshTokenRepository.RevokeRefreshTokenAsync(refreshToken);
            await this.refreshTokenRepository.AddRefreshTokenAsync(newRefreshToken);
            await this.refreshTokenRepository.SaveChangesAsync();

            return (newJwtToken, newRefreshToken.Token);
        }
    }
}
