using server.DTOs;
using server.Models;
using server.Repositories.Interfaces;
using server.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services.Implementations
{
    public class CompanyService : ICompanyService
    {
        private readonly ICompanyRepository _repo;
        public CompanyService(ICompanyRepository repo) { _repo = repo; }

        public async Task<IEnumerable<CompanyViewDto>> GetAllAsync()
        {
            var list = await _repo.GetAllAsync();
            return list.Select(c => new CompanyViewDto
            {
                Id = c.Id,
                Address = c.Address,
                Description = c.Description,
                Email = c.Email,
                Logo = c.Logo,
                NameCompany = c.NameCompany,
                PhoneNumber = c.PhoneNumber,
                Status = c.Status,
                UserId = c.UserId,
                OwnerFullName = c.User?.FullName
            }).ToList();
        }

        public async Task<CompanyViewDto?> GetByIdAsync(int id)
        {
            var c = await _repo.GetByIdAsync(id);
            if (c == null) return null;
            return new CompanyViewDto
            {
                Id = c.Id,
                Address = c.Address,
                Description = c.Description,
                Email = c.Email,
                Logo = c.Logo,
                NameCompany = c.NameCompany,
                PhoneNumber = c.PhoneNumber,
                Status = c.Status,
                UserId = c.UserId,
                OwnerFullName = c.User?.FullName
            };
        }

        public async Task<CompanyViewDto> CreateAsync(CompanyCreateDto dto)
        {
            var ent = new Company
            {
                Address = dto.Address,
                Description = dto.Description,
                Email = dto.Email,
                Logo = dto.Logo,
                NameCompany = dto.NameCompany,
                PhoneNumber = dto.PhoneNumber,
                Status = dto.Status,
                UserId = dto.UserId
            };
            var created = await _repo.AddAsync(ent);
            var loaded = await _repo.GetByIdAsync(created.Id);
            return new CompanyViewDto
            {
                Id = loaded!.Id,
                Address = loaded.Address,
                Description = loaded.Description,
                Email = loaded.Email,
                Logo = loaded.Logo,
                NameCompany = loaded.NameCompany,
                PhoneNumber = loaded.PhoneNumber,
                Status = loaded.Status,
                UserId = loaded.UserId,
                OwnerFullName = loaded.User?.FullName
            };
        }

        public async Task<CompanyViewDto?> UpdateAsync(int id, CompanyUpdateDto dto)
        {
            var ent = await _repo.GetByIdAsync(id);
            if (ent == null) return null;
            ent.Address = dto.Address;
            ent.Description = dto.Description;
            ent.Email = dto.Email;
            ent.Logo = dto.Logo;
            ent.NameCompany = dto.NameCompany;
            ent.PhoneNumber = dto.PhoneNumber;
            ent.Status = dto.Status;
            ent.UserId = dto.UserId;
            await _repo.UpdateAsync(ent);
            var loaded = await _repo.GetByIdAsync(id);
            return new CompanyViewDto
            {
                Id = loaded!.Id,
                Address = loaded.Address,
                Description = loaded.Description,
                Email = loaded.Email,
                Logo = loaded.Logo,
                NameCompany = loaded.NameCompany,
                PhoneNumber = loaded.PhoneNumber,
                Status = loaded.Status,
                UserId = loaded.UserId,
                OwnerFullName = loaded.User?.FullName
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
