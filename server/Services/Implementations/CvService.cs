using server.DTOs;
using server.Models;
using server.Repositories.Interfaces;
using server.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services.Implementations
{
    public class CvService : ICvService
    {
        private readonly ICvRepository _repo;
        public CvService(ICvRepository repo) { _repo = repo; }

        public async Task<IEnumerable<CvViewDto>> GetAllAsync()
        {
            var list = await _repo.GetAllAsync();
            return list.Select(cv => new CvViewDto { Id = cv.Id, UserId = cv.UserId, FileName = cv.FileName, UserFullName = cv.User?.FullName }).ToList();
        }

        public async Task<CvViewDto?> GetByIdAsync(int id)
        {
            var cv = await _repo.GetByIdAsync(id);
            if (cv == null) return null;
            return new CvViewDto { Id = cv.Id, UserId = cv.UserId, FileName = cv.FileName, UserFullName = cv.User?.FullName };
        }

        public async Task<CvViewDto> CreateAsync(CvCreateDto dto)
        {
            var ent = new Cv { UserId = dto.UserId, FileName = dto.FileName };
            var created = await _repo.AddAsync(ent);
            var loaded = await _repo.GetByIdAsync(created.Id);
            return new CvViewDto { Id = loaded!.Id, UserId = loaded.UserId, FileName = loaded.FileName, UserFullName = loaded.User?.FullName };
        }

        public async Task<CvViewDto?> UpdateAsync(int id, CvUpdateDto dto)
        {
            var ent = await _repo.GetByIdAsync(id);
            if (ent == null) return null;
            ent.UserId = dto.UserId;
            ent.FileName = dto.FileName;
            await _repo.UpdateAsync(ent);
            var loaded = await _repo.GetByIdAsync(id);
            return new CvViewDto { Id = loaded!.Id, UserId = loaded.UserId, FileName = loaded.FileName, UserFullName = loaded.User?.FullName };
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
