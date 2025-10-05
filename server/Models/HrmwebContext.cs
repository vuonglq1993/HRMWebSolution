using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        private readonly HrmwebContext _context;

        public UploadController(IWebHostEnvironment env, HrmwebContext context)
        {
            _env = env;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> UploadFile(IFormFile file, [FromForm] int userId)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            // Các loại file cho phép
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".pdf" };
            var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (!allowedExtensions.Contains(ext))
            {
                return BadRequest("Invalid file type.");
            }

            // Xác định thư mục con
            string subFolder;
            if (ext == ".pdf")
            {
                subFolder = "docs";
                if (file.ContentType != "application/pdf")
                {
                    return BadRequest("Invalid PDF file.");
                }
            }
            else
            {
                subFolder = "images";
                if (!file.ContentType.StartsWith("image/"))
                {
                    return BadRequest("Only image files are allowed.");
                }
            }

            long maxFileSize = 5 * 1024 * 1024; // 5 MB
            if (file.Length > maxFileSize)
            {
                return BadRequest("File is too large.");
            }

            var uploadDir = Path.Combine(_env.WebRootPath, "uploads", subFolder);
            if (!Directory.Exists(uploadDir))
            {
                Directory.CreateDirectory(uploadDir);
            }

            var fileName = Guid.NewGuid().ToString() + ext;
            var filePath = Path.Combine(uploadDir, fileName);

            try
            {
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

            var fileUrl = $"/uploads/{subFolder}/{fileName}";

            // Nếu là PDF thì lưu vào bảng cv
            if (ext == ".pdf")
            {
                var cv = new Cv
                {
                    UserId = userId,
                    FileName = fileUrl
                };
                _context.Cvs.Add(cv);
                await _context.SaveChangesAsync();

                return Ok(new { cvId = cv.Id, url = fileUrl });
            }

            return Ok(new { url = fileUrl });
        }
    }
}
