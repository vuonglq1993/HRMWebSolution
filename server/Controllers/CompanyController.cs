using server.DTOs;
using server.Services.Interfaces;

namespace server.Controllers
{
    public class CompanyController : BaseController<CompanyCreateDto, CompanyUpdateDto, CompanyViewDto, ICompanyService>
    {
        public CompanyController(ICompanyService service) : base(service) { }
    }
}