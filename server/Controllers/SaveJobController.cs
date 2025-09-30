using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaveJobController : ControllerBase
    {
        private readonly HrmwebContext _context;

        public SaveJobController(HrmwebContext context)
        {
            _context = context;
        }

        // GET: api/SaveJob
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetSaveJobs()
        {
            var SaveJobs = await _context.SaveJobs
                .Include(s => s.User)
                .Include(s => s.Recruitment)
                    .ThenInclude(r => r.Company)
                .Include(s => s.Recruitment)
                    .ThenInclude(r => r.Category)
                .Select(s => new
                {
                    s.Id,
                    s.UserId,
                    s.RecruitmentId,
                    User = s.User != null ? new
                    {
                        s.User.Id,
                        s.User.FullName,
                        s.User.Email,
                        s.User.PhoneNumber
                    } : null,
                    Recruitment = s.Recruitment != null ? new
                    {
                        s.Recruitment.Id,
                        s.Recruitment.Title,
                        s.Recruitment.Salary,
                        s.Recruitment.Quantity,
                        s.Recruitment.Deadline,
                        s.Recruitment.Status,
                        Company = s.Recruitment.Company != null ? new
                        {
                            s.Recruitment.Company.Id,
                            s.Recruitment.Company.NameCompany,
                            s.Recruitment.Company.Email,
                            s.Recruitment.Company.PhoneNumber
                        } : null,
                        Category = s.Recruitment.Category != null ? new
                        {
                            s.Recruitment.Category.Id,
                            s.Recruitment.Category.Name
                        } : null
                    } : null
                })
                .ToListAsync();

            return Ok(SaveJobs);
        }

        // GET: api/SaveJob/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetSaveJob(int id)
        {
            var SaveJob = await _context.SaveJobs
                .Include(s => s.User)
                .Include(s => s.Recruitment)
                    .ThenInclude(r => r.Company)
                .Include(s => s.Recruitment)
                    .ThenInclude(r => r.Category)
                .Where(s => s.Id == id)
                .Select(s => new
                {
                    s.Id,
                    s.UserId,
                    s.RecruitmentId,
                    User = s.User != null ? new
                    {
                        s.User.Id,
                        s.User.FullName,
                        s.User.Email,
                        s.User.PhoneNumber
                    } : null,
                    Recruitment = s.Recruitment != null ? new
                    {
                        s.Recruitment.Id,
                        s.Recruitment.Title,
                        s.Recruitment.Salary,
                        s.Recruitment.Quantity,
                        s.Recruitment.Deadline,
                        s.Recruitment.Status,
                        Company = s.Recruitment.Company != null ? new
                        {
                            s.Recruitment.Company.Id,
                            s.Recruitment.Company.NameCompany,
                            s.Recruitment.Company.Email,
                            s.Recruitment.Company.PhoneNumber
                        } : null,
                        Category = s.Recruitment.Category != null ? new
                        {
                            s.Recruitment.Category.Id,
                            s.Recruitment.Category.Name
                        } : null
                    } : null
                })
                .FirstOrDefaultAsync();

            if (SaveJob == null) return NotFound();

            return Ok(SaveJob);
        }

        // POST: api/SaveJob
        [HttpPost]
        public async Task<ActionResult<SaveJob>> PostSaveJob(SaveJob SaveJob)
        {
            _context.SaveJobs.Add(SaveJob);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSaveJob), new { id = SaveJob.Id }, SaveJob);
        }

        // PUT: api/SaveJob/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSaveJob(int id, SaveJob SaveJob)
        {
            if (id != SaveJob.Id) return BadRequest();

            _context.Entry(SaveJob).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.SaveJobs.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/SaveJob/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSaveJob(int id)
        {
            var SaveJob = await _context.SaveJobs.FindAsync(id);
            if (SaveJob == null) return NotFound();

            _context.SaveJobs.Remove(SaveJob);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
