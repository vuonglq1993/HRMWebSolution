using server.DTOs;
using server.Models;
using server.Repositories.Interfaces;
using server.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repo;
        public UserService(IUserRepository repo) { _repo = repo; }

        public async Task<IEnumerable<UserViewDto>> GetAllAsync()
        {
            var users = await _repo.GetAllAsync();
            return users.Select(u => new UserViewDto
            {
                Id = u.Id,
                Address = u.Address,
                Description = u.Description,
                Email = u.Email,
                FullName = u.FullName,
                Image = u.Image,
                PhoneNumber = u.PhoneNumber,
                RoleId = u.RoleId,
                RoleName = u.Role?.RoleName,
                Status = u.Status
            }).ToList();
        }

        public async Task<UserViewDto?> GetByIdAsync(int id)
        {
            var u = await _repo.GetByIdAsync(id);
            if (u == null) return null;
            return new UserViewDto
            {
                Id = u.Id,
                Address = u.Address,
                Description = u.Description,
                Email = u.Email,
                FullName = u.FullName,
                Image = u.Image,
                PhoneNumber = u.PhoneNumber,
                RoleId = u.RoleId,
                RoleName = u.Role?.RoleName,
                Status = u.Status
            };
        }

        public async Task<UserViewDto> CreateAsync(UserCreateDto dto)
        {
            var ent = new User
            {
                Address = dto.Address,
                Description = dto.Description,
                Email = dto.Email,
                FullName = dto.FullName,
                Image = dto.Image,
                Password = dto.Password,
                PhoneNumber = dto.PhoneNumber,
                RoleId = dto.RoleId,
                Status = dto.Status
            };
            var created = await _repo.AddAsync(ent);
            var loaded = await _repo.GetByIdAsync(created.Id);
            return new UserViewDto
            {
                Id = loaded!.Id,
                Address = loaded.Address,
                Description = loaded.Description,
                Email = loaded.Email,
                FullName = loaded.FullName,
                Image = loaded.Image,
                PhoneNumber = loaded.PhoneNumber,
                RoleId = loaded.RoleId,
                RoleName = loaded.Role?.RoleName,
                Status = loaded.Status
            };
        }

        public async Task<UserViewDto?> UpdateAsync(int id, UserUpdateDto dto)
        {
            var ent = await _repo.GetByIdAsync(id);
            if (ent == null) return null;
            ent.Address = dto.Address;
            ent.Description = dto.Description;
            ent.Email = dto.Email;
            ent.FullName = dto.FullName;
            ent.Image = dto.Image;
            ent.Password = dto.Password;
            ent.PhoneNumber = dto.PhoneNumber;
            ent.RoleId = dto.RoleId;
            ent.Status = dto.Status;
            await _repo.UpdateAsync(ent);
            var loaded = await _repo.GetByIdAsync(id);
            return new UserViewDto
            {
                Id = loaded!.Id,
                Address = loaded.Address,
                Description = loaded.Description,
                Email = loaded.Email,
                FullName = loaded.FullName,
                Image = loaded.Image,
                PhoneNumber = loaded.PhoneNumber,
                RoleId = loaded.RoleId,
                RoleName = loaded.Role?.RoleName,
                Status = loaded.Status
            };
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var ent = await _repo.GetByIdAsync(id);
            if (ent == null) return false;
            await _repo.DeleteAsync(id);
            return true;
        }
    }
}
