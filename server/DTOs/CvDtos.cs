namespace server.DTOs
{
    public class CvCreateDto
    {
        public int UserId { get; set; }
        public string? FileName { get; set; }
    }

    public class CvUpdateDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? FileName { get; set; }
    }

    public class CvViewDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? FileName { get; set; }
        public string? UserFullName { get; set; }
    }
}