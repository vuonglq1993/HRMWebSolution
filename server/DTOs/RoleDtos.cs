namespace server.DTOs
{
    public class RoleCreateDto { public string RoleName { get; set; } = null!; }
    public class RoleUpdateDto : RoleCreateDto { public int Id { get; set; } }
    public class RoleViewDto { public int Id { get; set; } public string RoleName { get; set; } = null!; }
}