using server.DTOs;
using server.Models;
using server.Repositories.Interfaces;
using server.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services.Implementations
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _repo;
        public CategoryService(ICategoryRepository repo) { _repo = repo; }

        public async Task<IEnumerable<CategoryViewDto>> GetAllAsync()
        {
            var list = await _repo.GetAllAsync();
            return list.Select(c => new CategoryViewDto { Id = c.Id, Name = c.Name, NumberChoose = c.NumberChoose }).ToList();
        }

        public async Task<CategoryViewDto?> GetByIdAsync(int id)
        {
            var c = await _repo.GetByIdAsync(id);
            if (c == null) return null;
            return new CategoryViewDto { Id = c.Id, Name = c.Name, NumberChoose = c.NumberChoose };
        }

        public async Task<CategoryViewDto> CreateAsync(CategoryCreateDto dto)
        {
            var ent = new Category { Name = dto.Name, NumberChoose = dto.NumberChoose };
            var created = await _repo.AddAsync(ent);
            return new CategoryViewDto { Id = created.Id, Name = created.Name, NumberChoose = created.NumberChoose };
        }

        public async Task<CategoryViewDto?> UpdateAsync(int id, CategoryUpdateDto dto)
        {
            var ent = await _repo.GetByIdAsync(id);
            if (ent == null) return null;
            ent.Name = dto.Name;
            ent.NumberChoose = dto.NumberChoose;
            await _repo.UpdateAsync(ent);
            var loaded = await _repo.GetByIdAsync(id);
            return new CategoryViewDto { Id = loaded!.Id, Name = loaded.Name, NumberChoose = loaded.NumberChoose };
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
