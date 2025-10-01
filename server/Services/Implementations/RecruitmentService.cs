using server.DTOs;
using server.Models;
using server.Repositories.Interfaces;
using server.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services.Implementations
{
    public class RecruitmentService : IRecruitmentService
    {
        private readonly IRecruitmentRepository _repo;
        public RecruitmentService(IRecruitmentRepository repo) { _repo = repo; }

        public async Task<IEnumerable<RecruitmentViewDto>> GetAllAsync()
        {
            var list = await _repo.GetAllAsync();
            return list.Select(r => new RecruitmentViewDto
            {
                Id = r.Id,
                Title = r.Title,
                CompanyName = r.Company?.NameCompany,
                CategoryName = r.Category?.Name,
                Status = r.Status
            }).ToList();
        }

        public async Task<RecruitmentViewDto?> GetByIdAsync(int id)
        {
            var r = await _repo.GetByIdAsync(id);
            if (r == null) return null;
            return new RecruitmentViewDto { Id = r.Id, Title = r.Title, CompanyName = r.Company?.NameCompany, CategoryName = r.Category?.Name, Status = r.Status };
        }

        public async Task<RecruitmentViewDto> CreateAsync(RecruitmentCreateDto dto)
        {
            var ent = new Recruitment
            {
                Address = dto.Address,
                CategoryId = dto.CategoryId,
                CompanyId = dto.CompanyId,
                CreatedAt = dto.CreatedAt,
                Deadline = dto.Deadline,
                Description = dto.Description,
                Experience = dto.Experience,
                Quantity = dto.Quantity,
                Rank = dto.Rank,
                Salary = dto.Salary,
                Status = dto.Status,
                Title = dto.Title,
                Type = dto.Type,
                Views = dto.Views
            };
            var created = await _repo.AddAsync(ent);
            var loaded = await _repo.GetByIdAsync(created.Id);
            return new RecruitmentViewDto { Id = loaded!.Id, Title = loaded.Title, CompanyName = loaded.Company?.NameCompany, CategoryName = loaded.Category?.Name, Status = loaded.Status };
        }

        public async Task<RecruitmentViewDto?> UpdateAsync(int id, RecruitmentUpdateDto dto)
        {
            var ent = await _repo.GetByIdAsync(id);
            if (ent == null) return null;
            ent.Address = dto.Address;
            ent.CategoryId = dto.CategoryId;
            ent.CompanyId = dto.CompanyId;
            ent.CreatedAt = dto.CreatedAt;
            ent.Deadline = dto.Deadline;
            ent.Description = dto.Description;
            ent.Experience = dto.Experience;
            ent.Quantity = dto.Quantity;
            ent.Rank = dto.Rank;
            ent.Salary = dto.Salary;
            ent.Status = dto.Status;
            ent.Title = dto.Title;
            ent.Type = dto.Type;
            ent.Views = dto.Views;
            await _repo.UpdateAsync(ent);
            var loaded = await _repo.GetByIdAsync(id);
            return new RecruitmentViewDto { Id = loaded!.Id, Title = loaded.Title, CompanyName = loaded.Company?.NameCompany, CategoryName = loaded.Category?.Name, Status = loaded.Status };
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
