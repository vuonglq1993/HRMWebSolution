namespace server.DTOs
{
    public class FollowCompanyCreateDto { public int UserId { get; set; } public int CompanyId { get; set; } }
    public class FollowCompanyUpdateDto : FollowCompanyCreateDto { public int Id { get; set; } }
    public class FollowCompanyViewDto { public int Id { get; set; } public int UserId { get; set; } public int CompanyId { get; set; } }
}