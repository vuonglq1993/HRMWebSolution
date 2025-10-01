using server.DTOs;
using server.Services.Interfaces;

namespace server.Controllers
{
    public class RoleController : BaseController<RoleCreateDto, RoleUpdateDto, RoleViewDto, IRoleService>
    {
        public RoleController(IRoleService service) : base(service) { }
    }
}