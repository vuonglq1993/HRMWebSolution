using server.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace server.Services.Interfaces
{
    public interface IRecruitmentService : IBaseService<RecruitmentCreateDto, RecruitmentUpdateDto, RecruitmentViewDto>
    {
        // 🔍 Hàm tìm kiếm theo từ khóa (Title, CompanyName, CategoryName)
        Task<IEnumerable<RecruitmentViewDto>> SearchAsync(string keyword);
    }
}