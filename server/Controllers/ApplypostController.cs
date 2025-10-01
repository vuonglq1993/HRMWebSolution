using server.DTOs;
using server.Services.Interfaces;

namespace server.Controllers
{
    public class ApplypostController : BaseController<ApplypostCreateDto, ApplypostUpdateDto, ApplypostViewDto,
        IApplypostService>
    {
        public ApplypostController(IApplypostService service) : base(service)
        {
        }
    }
}