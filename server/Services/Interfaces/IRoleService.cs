using server.DTOs;

namespace server.Services.Interfaces
{
    public interface IRoleService : IBaseService<RoleCreateDto, RoleUpdateDto, RoleViewDto> { }
}