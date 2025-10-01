namespace server.DTOs
{
    public class UserCreateDto
    {
        public string? Address { get; set; }
        public string? Description { get; set; }
        public string Email { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string? Image { get; set; }
        public string Password { get; set; } = null!;
        public string? PhoneNumber { get; set; }
        public int RoleId { get; set; }
        public int Status { get; set; }
    }

    public class UserUpdateDto : UserCreateDto
    {
        public int Id { get; set; }
    }

    public class UserViewDto
    {
        public int Id { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public string Email { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string? Image { get; set; }
        public string? PhoneNumber { get; set; }
        public int RoleId { get; set; }
        public string? RoleName { get; set; }
        public int Status { get; set; }
    }
}