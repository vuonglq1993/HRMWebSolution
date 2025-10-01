using server.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace server.Services.Interfaces
{
    public interface IUserService : IBaseService<UserCreateDto, UserUpdateDto, UserViewDto> 
    { 
        Task<UserViewDto?> UpdateProfileAsync(int id, UserProfileUpdateDto dto);
        Task<UserViewDto?> GetByEmailAsync(string email); // dùng cho login
        Task<bool> CheckPasswordAsync(string email, string password); // dùng cho login
    }
}
