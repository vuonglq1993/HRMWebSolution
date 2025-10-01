using server.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace server.Services.Interfaces
{
    public interface IUserService : IBaseService<UserCreateDto, UserUpdateDto, UserViewDto> { }
}