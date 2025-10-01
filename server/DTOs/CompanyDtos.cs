namespace server.DTOs
{
    public class CompanyCreateDto
    {
        public string? Address { get; set; }
        public string? Description { get; set; }
        public string? Email { get; set; }
        public string? Logo { get; set; }
        public string? NameCompany { get; set; }
        public string? PhoneNumber { get; set; }
        public int Status { get; set; }
        public int UserId { get; set; }
    }

    public class CompanyUpdateDto : CompanyCreateDto { public int Id { get; set; } }

    public class CompanyViewDto
    {
        public int Id { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public string? Email { get; set; }
        public string? Logo { get; set; }
        public string? NameCompany { get; set; }
        public string? PhoneNumber { get; set; }
        public int Status { get; set; }
        public int UserId { get; set; }
        public string? OwnerFullName { get; set; }
    }
}