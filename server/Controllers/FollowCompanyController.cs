using server.DTOs;
using server.Services.Interfaces;

namespace server.Controllers
{
    public class FollowCompanyController : BaseController<FollowCompanyCreateDto, FollowCompanyUpdateDto, FollowCompanyViewDto, IFollowCompanyService>
    {
        public FollowCompanyController(IFollowCompanyService service) : base(service) { }
    }
}