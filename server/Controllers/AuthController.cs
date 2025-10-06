using Microsoft.AspNetCore.Mvc;
using server.Services.Interfaces;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Google.Apis.Auth;
using server.DTOs;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _config;

        public AuthController(IUserService userService, IConfiguration config)
        {
            _userService = userService;
            _config = config;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _userService.GetByEmailAsync(dto.Email);
            if (user == null) return Unauthorized();

            var valid = await _userService.CheckPasswordAsync(dto.Email, dto.Password);
            if (!valid) return Unauthorized();

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.Role, user.RoleName ?? "Employee"),
                new Claim("UserId", user.Id.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(3),
                signingCredentials: creds
            );

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo
            });
        }

        [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginDto dto)
        {
            if (string.IsNullOrEmpty(dto.Token))
                return BadRequest("Missing Google token");

            try
            {
                var clientId = _config["GoogleAuth:ClientId"];
                if (string.IsNullOrEmpty(clientId))
                    return StatusCode(500, "Google Client ID not configured");

                var payload = await GoogleJsonWebSignature.ValidateAsync(dto.Token, new GoogleJsonWebSignature.ValidationSettings
                {
                    Audience = new[] { clientId }
                });

                var email = payload.Email;
                var name = payload.Name;
                var picture = payload.Picture;

                var user = await _userService.GetByEmailAsync(email);

                if (user == null)
                {
                    user = await _userService.CreateGoogleUserAsync(new CreateGoogleUserDto
                    {
                        Email = email,
                        FullName = name,
                        Image = picture,
                        RoleName = "Employee"
                    });
                }

                var claims = new[]
                {
                    new Claim(ClaimTypes.Name, user.Email),
                    new Claim(ClaimTypes.Role, user.RoleName ?? "Employee"),
                    new Claim("UserId", user.Id.ToString())
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    issuer: _config["Jwt:Issuer"],
                    audience: _config["Jwt:Audience"],
                    claims: claims,
                    expires: DateTime.Now.AddHours(3),
                    signingCredentials: creds
                );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo,
                    user = new
                    {
                        user.Id,
                        user.Email,
                        user.FullName,
                        user.Image,
                        user.RoleName
                    }
                });
            }
            catch (InvalidJwtException)
            {
                return Unauthorized("Invalid Google token");
            }
            catch (Exception ex)
            {
                Console.WriteLine("[GoogleLogin Error] " + ex.Message);
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
    }
}
