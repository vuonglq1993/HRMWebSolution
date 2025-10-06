using server.DTOs;

namespace server.Services.Interfaces
{
    public interface ICvService
    {
        Task<IEnumerable<CvViewDto>> GetAllAsync();
        Task<CvViewDto?> GetByIdAsync(int id);
        Task<CvViewDto> CreateAsync(CvCreateDto dto);
        Task<CvViewDto?> UpdateAsync(int id, CvUpdateDto dto);
        Task<bool> DeleteAsync(int id);
    }
}