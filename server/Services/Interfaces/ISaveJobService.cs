using server.DTOs;

namespace server.Services.Interfaces
{
    public interface ISaveJobService : IBaseService<SaveJobCreateDto, SaveJobUpdateDto, SaveJobViewDto> { }
}