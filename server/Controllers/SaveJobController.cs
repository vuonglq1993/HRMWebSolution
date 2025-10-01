using server.DTOs;
using server.Services.Interfaces;

namespace server.Controllers
{
    public class SaveJobController : BaseController<SaveJobCreateDto, SaveJobUpdateDto, SaveJobViewDto, ISaveJobService>
    {
        public SaveJobController(ISaveJobService service) : base(service) { }
    }
}