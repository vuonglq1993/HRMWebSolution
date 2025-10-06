using Microsoft.AspNetCore.Mvc;
using server.DTOs;
using server.Services.Interfaces;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaveJobController : BaseController<SaveJobCreateDto, SaveJobUpdateDto, SaveJobViewDto, ISaveJobService>
    {
        private readonly ISaveJobService _service;

        public SaveJobController(ISaveJobService service) : base(service)
        {
            _service = service;
        }

        // ✅ Custom endpoint: check if user saved job
        [HttpGet("check-saved")]
        public async Task<IActionResult> CheckSaved([FromQuery] int userId, [FromQuery] int recruitmentId)
        {
            if (userId <= 0 || recruitmentId <= 0)
                return BadRequest(new { message = "Invalid parameters" });

            var saved = await _service.CheckSavedAsync(userId, recruitmentId);
            return Ok(new { saved });
        }

        // ✅ Custom endpoint: unsave job
        [HttpDelete("unsave")]
        public async Task<IActionResult> Unsave([FromQuery] int userId, [FromQuery] int recruitmentId)
        {
            if (userId <= 0 || recruitmentId <= 0)
                return BadRequest(new { message = "Invalid parameters" });

            var deleted = await _service.UnsaveAsync(userId, recruitmentId);
            if (!deleted)
                return NotFound(new { message = "Saved job not found" });

            return NoContent();
        }
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetSavedJobsByUser(int userId)
        {
            if (userId <= 0)
                return BadRequest(new { message = "Invalid userId" });

            var list = await _service.GetSavedJobsByUserAsync(userId);
            return Ok(list);
        }

    }
}