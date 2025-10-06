namespace server.DTOs
{
    public class GoogleLoginDto
    {
        public string Token { get; set; }   // 👈 thêm dòng này
        public string Email { get; set; }
        public string Name { get; set; }
        public string Picture { get; set; }
    }
    
}