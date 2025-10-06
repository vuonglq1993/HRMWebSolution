using server.DTOs;
using server.Models;
using server.Repositories.Interfaces;
using server.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services.Implementations
{
    public class SaveJobService : ISaveJobService
    {
        private readonly ISaveJobRepository _repo;
        public SaveJobService(ISaveJobRepository repo) { _repo = repo; }

        public async Task<IEnumerable<SaveJobViewDto>> GetAllAsync()
        {
            var list = await _repo.GetAllAsync();
            return list.Select(s => new SaveJobViewDto { Id = s.Id, UserId = s.UserId, RecruitmentId = s.RecruitmentId }).ToList();
        }

        public async Task<SaveJobViewDto?> GetByIdAsync(int id)
        {
            var s = await _repo.GetByIdAsync(id);
            if (s == null) return null;
            return new SaveJobViewDto { Id = s.Id, UserId = s.UserId, RecruitmentId = s.RecruitmentId };
        }

        public async Task<SaveJobViewDto> CreateAsync(SaveJobCreateDto dto)
        {
            var ent = new SaveJob { UserId = dto.UserId, RecruitmentId = dto.RecruitmentId };
            var created = await _repo.AddAsync(ent);
            var loaded = await _repo.GetByIdAsync(created.Id);
            return new SaveJobViewDto { Id = loaded!.Id, UserId = loaded.UserId, RecruitmentId = loaded.RecruitmentId };
        }

        public async Task<SaveJobViewDto?> UpdateAsync(int id, SaveJobUpdateDto dto)
        {
            var ent = await _repo.GetByIdAsync(id);
            if (ent == null) return null;
            ent.UserId = dto.UserId;
            ent.RecruitmentId = dto.RecruitmentId;
            await _repo.UpdateAsync(ent);
            var loaded = await _repo.GetByIdAsync(id);
            return new SaveJobViewDto { Id = loaded!.Id, UserId = loaded.UserId, RecruitmentId = loaded.RecruitmentId };
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var ent = await _repo.GetByIdAsync(id);
            if (ent == null) return false;
            await _repo.DeleteAsync(id);
            return true;
        }

        public async Task<bool> CheckSavedAsync(int userId, int recruitmentId)
        {
            var list = await _repo.GetAllAsync();
            return list.Any(s => s.UserId == userId && s.RecruitmentId == recruitmentId);
        }

        public async Task<bool> UnsaveAsync(int userId, int recruitmentId)
        {
            var ent = await _repo.GetByUserAndRecruitmentAsync(userId, recruitmentId);
            if (ent == null) return false;
            await _repo.DeleteAsync(ent.Id);
            return true;
        }
public async Task<IEnumerable<SaveJobViewDto>> GetSavedJobsByUserAsync(int userId)
{
    var list = await _repo.GetAllAsync();

    return list
        .Where(s => s.UserId == userId)
        .Select(s => new SaveJobViewDto
        {
            Id = s.Id,
            UserId = s.UserId,
            RecruitmentId = s.RecruitmentId,
            JobTitle = s.Recruitment?.Title,
            CompanyName = s.Recruitment?.Company?.NameCompany, // 👈 lấy từ Company
            CategoryName = s.Recruitment?.Category?.Name        // hoặc CategoryName nếu là text
        })
        .ToList();
}


    }
}
