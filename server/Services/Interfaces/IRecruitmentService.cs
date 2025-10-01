using server.DTOs;

namespace server.Services.Interfaces
{
    public interface IRecruitmentService : IBaseService<RecruitmentCreateDto, RecruitmentUpdateDto, RecruitmentViewDto> { }
}