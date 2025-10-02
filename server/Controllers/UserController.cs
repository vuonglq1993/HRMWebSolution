using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.DTOs;
using server.Services.Interfaces;
using System.Threading.Tasks;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : BaseController<UserCreateDto, UserUpdateDto, UserViewDto, IUserService>
    {
        private readonly IUserService _service;

        public UserController(IUserService service) : base(service)
        {
            _service = service;
        }

        // PUT api/user/profile/5
        [HttpPut("profile/{id}")]
        [Authorize] // bắt buộc login
        public async Task<IActionResult> UpdateProfile(int id, [FromBody] UserProfileUpdateDto dto)
        {
            var updated = await _service.UpdateProfileAsync(id, dto);
            if (updated == null) return NotFound();
            return Ok(updated);
        }
    }
}
