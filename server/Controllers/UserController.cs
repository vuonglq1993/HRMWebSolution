using server.DTOs;
using server.Services.Interfaces;

namespace server.Controllers
{
    public class UserController : BaseController<UserCreateDto, UserUpdateDto, UserViewDto, IUserService>
    {
        public UserController(IUserService service) : base(service) { }
    }
}