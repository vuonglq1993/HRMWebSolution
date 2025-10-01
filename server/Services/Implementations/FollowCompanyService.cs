using server.DTOs;
using server.Models;
using server.Repositories.Interfaces;
using server.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services.Implementations
{
    public class FollowCompanyService : IFollowCompanyService
    {
        private readonly IFollowCompanyRepository _repo;
        public FollowCompanyService(IFollowCompanyRepository repo) { _repo = repo; }

        public async Task<IEnumerable<FollowCompanyViewDto>> GetAllAsync()
        {
            var list = await _repo.GetAllAsync();
            return list.Select(f => new FollowCompanyViewDto { Id = f.Id, UserId = f.UserId, CompanyId = f.CompanyId }).ToList();
        }

        public async Task<FollowCompanyViewDto?> GetByIdAsync(int id)
        {
            var f = await _repo.GetByIdAsync(id);
            if (f == null) return null;
            return new FollowCompanyViewDto { Id = f.Id, UserId = f.UserId, CompanyId = f.CompanyId };
        }

        public async Task<FollowCompanyViewDto> CreateAsync(FollowCompanyCreateDto dto)
        {
            var ent = new FollowCompany { UserId = dto.UserId, CompanyId = dto.CompanyId };
            var created = await _repo.AddAsync(ent);
            var loaded = await _repo.GetByIdAsync(created.Id);
            return new FollowCompanyViewDto { Id = loaded!.Id, UserId = loaded.UserId, CompanyId = loaded.CompanyId };
        }

        public async Task<FollowCompanyViewDto?> UpdateAsync(int id, FollowCompanyUpdateDto dto)
        {
            var ent = await _repo.GetByIdAsync(id);
            if (ent == null) return null;
            ent.UserId = dto.UserId;
            ent.CompanyId = dto.CompanyId;
            await _repo.UpdateAsync(ent);
            var loaded = await _repo.GetByIdAsync(id);
            return new FollowCompanyViewDto { Id = loaded!.Id, UserId = loaded.UserId, CompanyId = loaded.CompanyId };
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
