using server.DTOs;

namespace server.Services.Interfaces
{
    public interface ICompanyService : IBaseService<CompanyCreateDto, CompanyUpdateDto, CompanyViewDto> { }
}