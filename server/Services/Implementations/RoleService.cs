using server.DTOs;
using server.Models;
using server.Repositories.Interfaces;
using server.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services.Implementations
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _repo;
        public RoleService(IRoleRepository repo) { _repo = repo; }

        public async Task<IEnumerable<RoleViewDto>> GetAllAsync()
        {
            var roles = await _repo.GetAllAsync();
            return roles.Select(r => new RoleViewDto
            {
                Id = r.Id,
                RoleName = r.RoleName,
            }).ToList();
        }

        public async Task<RoleViewDto?> GetByIdAsync(int id)
        {
            var r = await _repo.GetByIdAsync(id);
            if (r == null) return null;
            return new RoleViewDto { Id = r.Id, RoleName = r.RoleName };
        }

        public async Task<RoleViewDto> CreateAsync(RoleCreateDto dto)
        {
            var ent = new Role { RoleName = dto.RoleName };
            var created = await _repo.AddAsync(ent);
            return new RoleViewDto { Id = created.Id, RoleName = created.RoleName };
        }

        public async Task<RoleViewDto?> UpdateAsync(int id, RoleUpdateDto dto)
        {
            var ent = await _repo.GetByIdAsync(id);
            if (ent == null) return null;
            ent.RoleName = dto.RoleName;
            await _repo.UpdateAsync(ent);
            var loaded = await _repo.GetByIdAsync(id);
            return new RoleViewDto { Id = loaded!.Id, RoleName = loaded.RoleName };
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
