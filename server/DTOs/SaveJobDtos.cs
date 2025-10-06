namespace server.DTOs
{
    public class SaveJobCreateDto { public int UserId { get; set; } public int RecruitmentId { get; set; } }
    public class SaveJobUpdateDto : SaveJobCreateDto { public int Id { get; set; } }
    public class SaveJobViewDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int RecruitmentId { get; set; }

        // 👇 Thông tin hiển thị thêm
        public string? JobTitle { get; set; }
        public string? CompanyName { get; set; }
        public string? CategoryName { get; set; }
    }
}