namespace server.DTOs
{
    public class ApplypostCreateDto
    {
        public int UserId { get; set; }
        public int RecruitmentId { get; set; }
        public string? NameCv { get; set; }
        public string? Text { get; set; }
        public string? CreatedAt { get; set; }
        public int Status { get; set; }
    }

    public class ApplypostUpdateDto : ApplypostCreateDto
    {
        public int Id { get; set; }
    }

    public class ApplypostViewDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? UserFullName { get; set; }
        public int RecruitmentId { get; set; }
        public string? RecruitmentTitle { get; set; }
        public string? NameCv { get; set; }
        public string? Text { get; set; }
        public string? CreatedAt { get; set; }
        public int Status { get; set; }
    }
}