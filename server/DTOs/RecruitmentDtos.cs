namespace server.DTOs
{


    public class RecruitmentCreateDto
    {
        public string? Address { get; set; }
        public int CategoryId { get; set; }
        public int CompanyId { get; set; }
        public string? CreatedAt { get; set; }
        public string? Deadline { get; set; }
        public string? Description { get; set; }
        public string? Experience { get; set; }
        public string? Quantity { get; set; }
        public string? Rank { get; set; }
        public string? Salary { get; set; }
        public int Status { get; set; }
        public string? Title { get; set; }
        public string? Type { get; set; }
        public int Views { get; set; }
    }

    public class RecruitmentUpdateDto : RecruitmentCreateDto
    {
        public int Id { get; set; }
    }

    public class RecruitmentViewDto
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? CompanyName { get; set; }
        public string? CategoryName { get; set; }
        public int Status { get; set; }
    }
}