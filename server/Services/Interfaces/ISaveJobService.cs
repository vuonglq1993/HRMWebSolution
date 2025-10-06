using server.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace server.Services.Interfaces
{
public interface ISaveJobService : IBaseService<SaveJobCreateDto, SaveJobUpdateDto, SaveJobViewDto>
{
    Task<bool> CheckSavedAsync(int userId, int recruitmentId);
    Task<bool> UnsaveAsync(int userId, int recruitmentId);
        Task<IEnumerable<SaveJobViewDto>> GetSavedJobsByUserAsync(int userId);

}

}
