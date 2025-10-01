using server.DTOs;

namespace server.Services.Interfaces
{
    public interface ICategoryService : IBaseService<CategoryCreateDto, CategoryUpdateDto, CategoryViewDto> { }
}