using server.DTOs;
using server.Services.Interfaces;

namespace server.Controllers
{
    public class CvController : BaseController<CvCreateDto, CvUpdateDto, CvViewDto, ICvService>
    {
        public CvController(ICvService service) : base(service) { }
    }
}