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
                return this.Ok(new { AccessToken = accessToken, RefreshToken = refreshToken });
            }

            return this.Unauthorized("Invalid credentials");
        }

        [HttpGet("external-login/{provider}")]
        public IActionResult ExternalLogin(string provider, string returnUrl = null)
        {
            var redirectUrl = this.Url.Action(nameof(this.ExternalLoginCallback), "Auth", new { returnUrl = "/" });
            var properties = this.signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
            return this.Challenge(properties, provider);
        }

        [HttpGet("external-login-callback")]
        public async Task<IActionResult> ExternalLoginCallback(string returnUrl = null, string remoteError = null)
        {
            var (success, result) = await this.authService.ExternalLoginCallbackAsync(returnUrl, remoteError);
            if (success)
            {
                return this.Redirect(result);
            }

            return this.BadRequest(result);
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> Refresh([FromBody] RefreshTokenRequest model)
        {
            var (newAccessToken, newRefreshToken) = await this.authService.RefreshTokenAsync(model.RefreshToken);

            if (newAccessToken == null)
            {
                return this.Unauthorized(newRefreshToken);
            }

            return this.Ok(new { AccessToken = newAccessToken, RefreshToken = newRefreshToken });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var (success, accessToken, refreshToken, errorMessage) = await this.authService.RegisterAsync(model);

            if (success)
            {
                return this.Ok(new { AccessToken = accessToken, RefreshToken = refreshToken });
            }

            return this.BadRequest(new { Error = errorMessage });
        }
    }
}
