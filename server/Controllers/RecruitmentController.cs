using server.DTOs;
using server.Services.Interfaces;

namespace server.Controllers
{
    public class RecruitmentController : BaseController<RecruitmentCreateDto, RecruitmentUpdateDto, RecruitmentViewDto, IRecruitmentService>
    {
        public RecruitmentController(IRecruitmentService service) : base(service) { }
    }
}