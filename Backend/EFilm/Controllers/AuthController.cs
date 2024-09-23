using Business_Logic_Layer.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Models;
using EFilm.Models;
using Models.DTO;
using Microsoft.AspNetCore.Authorization;

namespace EFilm.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IConfiguration configuration;
        private readonly IAuthService authService;

        public AuthController(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager, IConfiguration configuration, IAuthService authService)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.configuration = configuration;
            this.authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var (accessToken, refreshToken) = await this.authService.LoginAsync(model);
            if (accessToken != null)
            {
                this.SetTokensAsCookies(accessToken, refreshToken);
                return this.Ok(new { message = "Login successful" });
            }

            return this.Unauthorized("Invalid credentials");
        }

        [HttpGet("check")]
        [Authorize]
        public IActionResult CheckAuth()
        {
            if (this.User.Identity?.IsAuthenticated == true)
            {
                return this.Ok(new { isAuthenticated = true });
            }

            return this.Unauthorized(new { isAuthenticated = false });
        }

        [HttpGet("external-login/{provider}")]
        public IActionResult ExternalLogin(string provider, string returnUrl = null)
        {
            if (string.IsNullOrEmpty(returnUrl) || !Uri.IsWellFormedUriString(returnUrl,UriKind.Absolute))
            {
                return this.BadRequest("El returnUrl es requerido y debe ser una URL válida.");
            }

            var redirectUrl = this.Url.Action(nameof(this.ExternalLoginCallback), "Auth", new { returnUrl });
            var properties = this.signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
            return this.Challenge(properties, provider);
        }

        [HttpGet("external-login-callback")]
        public async Task<IActionResult> ExternalLoginCallback(string returnUrl = null, string remoteError = null)
        {
            var (success, accessToken, refreshToken, result) = await this.authService.ExternalLoginCallbackAsync(returnUrl, remoteError);
            if (success)
            {
                this.SetTokensAsCookies(accessToken, refreshToken);
                return this.Redirect(result);
            }

            return this.BadRequest(result);
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken))
            {
                return this.Unauthorized("Refresh token is missing.");
            }

            var (newAccessToken, newRefreshToken) = await this.authService.RefreshTokenAsync(refreshToken);
            if (newAccessToken == null)
            {
                return this.Unauthorized("Invalid or expired refresh token.");
            }

            this.SetTokensAsCookies(newAccessToken, newRefreshToken);
            return this.Ok(new { message = "Token refreshed" });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var (success, accessToken, refreshToken, errorMessage) = await this.authService.RegisterAsync(model);

            if (success)
            {
                this.SetTokensAsCookies(accessToken, refreshToken);
                return this.Ok(new { message = "Registration successful" });
            }

            return this.BadRequest(new { Error = errorMessage });
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("accessToken");
            Response.Cookies.Delete("refreshToken");
            return this.Ok(new { message = "Logged out successfully" });
        }

        private void SetTokensAsCookies(string accessToken, string refreshToken)
        {
            var accessTokenCookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = false, // Set to true in production
                SameSite = SameSiteMode.Lax,
                Expires = DateTime.UtcNow.AddMinutes(30),
            };

            var refreshTokenCookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = false, // Set to true in production
                SameSite = SameSiteMode.Lax,
                Expires = DateTime.UtcNow.AddDays(7),
            };

            Response.Cookies.Append("accessToken", accessToken, accessTokenCookieOptions);
            Response.Cookies.Append("refreshToken", refreshToken, refreshTokenCookieOptions);
        }
    }
}
