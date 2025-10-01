using server.DTOs;

namespace server.Services.Interfaces
{
    public interface ICvService : IBaseService<CvCreateDto, CvUpdateDto, CvViewDto> { }
}