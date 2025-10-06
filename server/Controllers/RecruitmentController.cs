using Microsoft.AspNetCore.Mvc;
using server.DTOs;
using server.Services.Interfaces;
using System.Threading.Tasks;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecruitmentController : BaseController<RecruitmentCreateDto, RecruitmentUpdateDto, RecruitmentViewDto, IRecruitmentService>
    {
        private readonly IRecruitmentService _service;

        public RecruitmentController(IRecruitmentService service) : base(service)
        {
            _service = service;
        }

        // 🔍 API tìm kiếm tuyển dụng
        // GET: /api/recruitment/search?keyword=frontend
        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string keyword)
        {
            if (string.IsNullOrWhiteSpace(keyword))
                return BadRequest(new { message = "Keyword cannot be empty" });

            var results = await _service.SearchAsync(keyword);
            return Ok(results);
        }
    }
}
