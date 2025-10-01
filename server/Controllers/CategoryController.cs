using server.DTOs;
using server.Services.Interfaces;

namespace server.Controllers
{
    public class CategoryController : BaseController<CategoryCreateDto, CategoryUpdateDto, CategoryViewDto, ICategoryService>
    {
        public CategoryController(ICategoryService service) : base(service) { }
    }
}