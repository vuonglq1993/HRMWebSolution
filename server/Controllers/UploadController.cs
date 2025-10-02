using Microsoft.AspNetCore.Mvc;

namespace server.Controllers;
[Route("api/[controller]")]
[ApiController]
public class UploadController : ControllerBase
{
    private readonly IWebHostEnvironment _env;

    public UploadController(IWebHostEnvironment env)
    {
        _env = env;
    }


[HttpPost]
public async Task<IActionResult> UploadFile(IFormFile file)
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
        // check MIME cho PDF
        if (file.ContentType != "application/pdf")
        {
            return BadRequest("Invalid PDF file.");
        }
    }
    else
    {
        subFolder = "images";
        // check MIME cho ảnh
        if (!file.ContentType.StartsWith("image/"))
        {
            return BadRequest("Only image files are allowed.");
        }
    }

    // Giới hạn dung lượng
    long maxFileSize = 5 * 1024 * 1024; // 5 MB
    if (file.Length > maxFileSize)
    {
        return BadRequest("File is too large.");
    }

    // Đường dẫn thư mục
    var uploadDir = Path.Combine(_env.WebRootPath, "uploads", subFolder);
    if (!Directory.Exists(uploadDir))
    {
        Directory.CreateDirectory(uploadDir);
    }

    // Tạo tên file
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

    // Trả về URL cho client
    var fileUrl = $"/uploads/{subFolder}/{fileName}";
    return Ok(new { url = fileUrl });
}
}