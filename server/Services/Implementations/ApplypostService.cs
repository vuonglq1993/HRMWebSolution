using server.DTOs;
using server.Models;
using server.Repositories.Interfaces;
using server.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services.Implementations
{
    public class ApplypostService : IApplypostService
    {
        private readonly IApplypostRepository _repo;
        public ApplypostService(IApplypostRepository repo) { _repo = repo; }

        public async Task<IEnumerable<ApplypostViewDto>> GetAllAsync()
        {
            var list = await _repo.GetAllAsync();
            return list.Select(a => new ApplypostViewDto
            {
                Id = a.Id,
                UserId = a.UserId,
                UserFullName = a.User?.FullName,
                RecruitmentId = a.RecruitmentId,
                RecruitmentTitle = a.Recruitment?.Title,
                NameCv = a.NameCv,
                Text = a.Text,
                CreatedAt = a.CreatedAt,
                Status = a.Status
            }).ToList();
        }

        public async Task<ApplypostViewDto?> GetByIdAsync(int id)
        {
            var a = await _repo.GetByIdAsync(id);
            if (a == null) return null;
            return new ApplypostViewDto
            {
                Id = a.Id,
                UserId = a.UserId,
                UserFullName = a.User?.FullName,
                RecruitmentId = a.RecruitmentId,
                RecruitmentTitle = a.Recruitment?.Title,
                NameCv = a.NameCv,
                Text = a.Text,
                CreatedAt = a.CreatedAt,
                Status = a.Status
            };
        }

        public async Task<ApplypostViewDto> CreateAsync(ApplypostCreateDto dto)
        {
            var ent = new Applypost
            {
                UserId = dto.UserId,
                RecruitmentId = dto.RecruitmentId,
                NameCv = dto.NameCv,
                Text = dto.Text,
                CreatedAt = dto.CreatedAt,
                Status = dto.Status
            };
            var created = await _repo.AddAsync(ent);
            var loaded = await _repo.GetByIdAsync(created.Id);
            return new ApplypostViewDto
            {
                Id = loaded!.Id,
                UserId = loaded.UserId,
                UserFullName = loaded.User?.FullName,
                RecruitmentId = loaded.RecruitmentId,
                RecruitmentTitle = loaded.Recruitment?.Title,
                NameCv = loaded.NameCv,
                Text = loaded.Text,
                CreatedAt = loaded.CreatedAt,
                Status = loaded.Status
            };
        }

        public async Task<ApplypostViewDto?> UpdateAsync(int id, ApplypostUpdateDto dto)
        {
            var ent = await _repo.GetByIdAsync(id);
            if (ent == null) return null;
            ent.UserId = dto.UserId;
            ent.RecruitmentId = dto.RecruitmentId;
            ent.NameCv = dto.NameCv;
            ent.Text = dto.Text;
            ent.CreatedAt = dto.CreatedAt;
            ent.Status = dto.Status;
            await _repo.UpdateAsync(ent);
            var loaded = await _repo.GetByIdAsync(id);
            return new ApplypostViewDto
            {
                Id = loaded!.Id,
                UserId = loaded.UserId,
                UserFullName = loaded.User?.FullName,
                RecruitmentId = loaded.RecruitmentId,
                RecruitmentTitle = loaded.Recruitment?.Title,
                NameCv = loaded.NameCv,
                Text = loaded.Text,
                CreatedAt = loaded.CreatedAt,
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
