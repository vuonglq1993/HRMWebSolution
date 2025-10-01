namespace server.DTOs
{
    public class CategoryCreateDto { public string? Name { get; set; } public int NumberChoose { get; set; } }
    public class CategoryUpdateDto : CategoryCreateDto { public int Id { get; set; } }
    public class CategoryViewDto { public int Id { get; set; } public string? Name { get; set; } public int NumberChoose { get; set; } }
}