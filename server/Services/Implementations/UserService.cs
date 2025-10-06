using server.DTOs;
using server.Models;
using server.Repositories.Interfaces;
using server.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BCrypt.Net;

namespace server.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repo;

        public UserService(IUserRepository repo) 
        { 
            _repo = repo; 
        }

        public async Task<IEnumerable<UserViewDto>> GetAllAsync()
        {
            var users = await _repo.GetAllAsync();
            return users.Select(MapToUserViewDto).ToList();
        }

        public async Task<UserViewDto?> GetByIdAsync(int id)
        {
            var user = await _repo.GetByIdAsync(id);
            return user == null ? null : MapToUserViewDto(user);
        }

        public async Task<UserViewDto> CreateAsync(UserCreateDto dto)
        {
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password);
            var user = new User
            {
                Address = dto.Address,
                Description = dto.Description,
                Email = dto.Email,
                FullName = dto.FullName,
                Image = dto.Image,
                Password = hashedPassword,
                PhoneNumber = dto.PhoneNumber,
                RoleId = dto.RoleId,
                Status = dto.Status
            };

            var created = await _repo.AddAsync(user);
            var loaded = await _repo.GetByIdAsync(created.Id);
            return MapToUserViewDto(loaded!);
        }

        public async Task<UserViewDto> CreateGoogleUserAsync(CreateGoogleUserDto dto)
        {
            var role = await _repo.GetRoleByNameAsync(dto.RoleName ?? "Employee");
            int roleId = role?.Id ?? 0;

            var user = new User
            {
                Email = dto.Email,
                FullName = dto.FullName,
                Image = dto.Image,
                Password = null,
                RoleId = roleId,
                Status = 1
            };

            var created = await _repo.AddAsync(user);
            var loaded = await _repo.GetByIdAsync(created.Id);

            return MapToUserViewDto(loaded!);
        }

        public async Task<UserViewDto?> UpdateAsync(int id, UserUpdateDto dto)
        {
            var user = await _repo.GetByIdAsync(id);
            if (user == null) return null;

            user.Address = dto.Address;
            user.Description = dto.Description;
            user.Email = dto.Email;
            user.FullName = dto.FullName;
            user.Image = dto.Image;

            if (!string.IsNullOrEmpty(dto.Password))
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(dto.Password);
            }

            user.PhoneNumber = dto.PhoneNumber;
            user.RoleId = dto.RoleId;
            user.Status = dto.Status;

            await _repo.UpdateAsync(user);
            var updatedUser = await _repo.GetByIdAsync(id);
            return MapToUserViewDto(updatedUser!);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var user = await _repo.GetByIdAsync(id);
            if (user == null) return false;

            await _repo.DeleteAsync(id);
            return true;
        }

        public async Task<UserViewDto?> UpdateProfileAsync(int id, UserProfileUpdateDto dto)
        {
            var user = await _repo.GetByIdAsync(id);
            if (user == null) return null;

            if (dto.FullName != null) user.FullName = dto.FullName;
            if (dto.Address != null) user.Address = dto.Address;
            if (dto.Description != null) user.Description = dto.Description;
            if (dto.PhoneNumber != null) user.PhoneNumber = dto.PhoneNumber;
            if (dto.Email != null) user.Email = dto.Email;
            if (dto.Image != null) user.Image = dto.Image;
            if (!string.IsNullOrEmpty(dto.NewPassword))
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            }

            await _repo.UpdateAsync(user);
            var updatedUser = await _repo.GetByIdAsync(id);
            return MapToUserViewDto(updatedUser!);
        }

        public async Task<UserViewDto?> GetByEmailAsync(string email)
        {
            var users = await _repo.GetAllAsync();
            var user = users.FirstOrDefault(u => u.Email == email);
            return user == null ? null : MapToUserViewDto(user);
        }

        public async Task<bool> CheckPasswordAsync(string email, string password)
        {
            var users = await _repo.GetAllAsync();
            var user = users.FirstOrDefault(u => u.Email == email);
            if (user == null) return false;
            return BCrypt.Net.BCrypt.Verify(password, user.Password);
        }

        // Private helper to map User -> UserViewDto
        private UserViewDto MapToUserViewDto(User user)
        {
            return new UserViewDto
            {
                Id = user.Id,
                Address = user.Address,
                Description = user.Description,
                Email = user.Email,
                FullName = user.FullName,
                Image = user.Image,
                PhoneNumber = user.PhoneNumber,
                RoleId = user.RoleId,
                RoleName = user.Role?.RoleName,
                Status = user.Status
            };
        }
    }
}
