using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecruitmentController : ControllerBase
    {
        private readonly HrmwebContext _context;

        public RecruitmentController(HrmwebContext context)
        {
            _context = context;
        }

        // GET: api/Recruitment
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetRecruitments()
        {
            var recruitments = await _context.Recruitments
                .Include(r => r.Company)
                .Include(r => r.Category)
                .Select(r => new
                {
                    r.Id,
                    r.Title,
                    r.Description,
                    r.Experience,
                    r.Quantity,
                    r.Salary,
                    r.Deadline,
                    r.Status,
                    r.View,
                    r.Type,
                    Company = r.Company != null ? new
                    {
                        r.Company.Id,
                        r.Company.NameCompany,
                        r.Company.Email,
                        r.Company.PhoneNumber
                    } : null,
                    Category = r.Category != null ? new
                    {
                        r.Category.Id,
                        r.Category.Name
                    } : null
                })
                .ToListAsync();

            return Ok(recruitments);
        }

        // GET: api/Recruitment/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetRecruitment(int id)
        {
            var recruitment = await _context.Recruitments
                .Include(r => r.Company)
                .Include(r => r.Category)
                .Where(r => r.Id == id)
                .Select(r => new
                {
                    r.Id,
                    r.Title,
                    r.Description,
                    r.Experience,
                    r.Quantity,
                    r.Salary,
                    r.Deadline,
                    r.Status,
                    r.View,
                    r.Type,
                    Company = r.Company != null ? new
                    {
                        r.Company.Id,
                        r.Company.NameCompany,
                        r.Company.Email,
                        r.Company.PhoneNumber
                    } : null,
                    Category = r.Category != null ? new
                    {
                        r.Category.Id,
                        r.Category.Name
                    } : null
                })
                .FirstOrDefaultAsync();

            if (recruitment == null) return NotFound();

            return Ok(recruitment);
        }

        // POST: api/Recruitment
        [HttpPost]
        public async Task<ActionResult<Recruitment>> PostRecruitment(Recruitment recruitment)
        {
            _context.Recruitments.Add(recruitment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRecruitment), new { id = recruitment.Id }, recruitment);
        }

        // PUT: api/Recruitment/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecruitment(int id, Recruitment recruitment)
        {
            if (id != recruitment.Id) return BadRequest();

            _context.Entry(recruitment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Recruitments.Any(e => e.Id == id))
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

        // DELETE: api/Recruitment/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecruitment(int id)
        {
            var recruitment = await _context.Recruitments.FindAsync(id);
            if (recruitment == null) return NotFound();

            _context.Recruitments.Remove(recruitment);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
