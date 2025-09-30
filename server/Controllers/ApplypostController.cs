using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplypostController : ControllerBase
    {
        private readonly HrmwebContext _context;

        public ApplypostController(HrmwebContext context)
        {
            _context = context;
        }

        // GET: api/Applypost
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetApplyposts()
        {
            var applyposts = await _context.Applyposts
                .Include(a => a.User)
                .Include(a => a.Recruitment)
                    .ThenInclude(r => r.Company)
                .Include(a => a.Recruitment)
                    .ThenInclude(r => r.Category)
                .Select(a => new
                {
                    a.Id,
                    a.CreatedAt,
                    a.NameCv,
                    a.Status,
                    a.Text,

                    User = a.User != null ? new
                    {
                        a.User.Id,
                        a.User.FullName,
                        a.User.Email,
                        a.User.PhoneNumber
                    } : null,

                    Recruitment = a.Recruitment != null ? new
                    {
                        a.Recruitment.Id,
                        a.Recruitment.Title,
                        a.Recruitment.Salary,
                        a.Recruitment.Quantity,
                        a.Recruitment.Deadline,
                        a.Recruitment.Status,

                        Company = a.Recruitment.Company != null ? new
                        {
                            a.Recruitment.Company.Id,
                            a.Recruitment.Company.NameCompany,
                            a.Recruitment.Company.Email,
                            a.Recruitment.Company.PhoneNumber
                        } : null,

                        Category = a.Recruitment.Category != null ? new
                        {
                            a.Recruitment.Category.Id,
                            a.Recruitment.Category.Name
                        } : null
                    } : null
                })
                .ToListAsync();

            return Ok(applyposts);
        }

        // GET: api/Applypost/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetApplypost(int id)
        {
            var applypost = await _context.Applyposts
                .Include(a => a.User)
                .Include(a => a.Recruitment)
                    .ThenInclude(r => r.Company)
                .Include(a => a.Recruitment)
                    .ThenInclude(r => r.Category)
                .Where(a => a.Id == id)
                .Select(a => new
                {
                    a.Id,
                    a.CreatedAt,
                    a.NameCv,
                    a.Status,
                    a.Text,

                    User = a.User != null ? new
                    {
                        a.User.Id,
                        a.User.FullName,
                        a.User.Email,
                        a.User.PhoneNumber
                    } : null,

                    Recruitment = a.Recruitment != null ? new
                    {
                        a.Recruitment.Id,
                        a.Recruitment.Title,
                        a.Recruitment.Salary,
                        a.Recruitment.Quantity,
                        a.Recruitment.Deadline,
                        a.Recruitment.Status,

                        Company = a.Recruitment.Company != null ? new
                        {
                            a.Recruitment.Company.Id,
                            a.Recruitment.Company.NameCompany,
                            a.Recruitment.Company.Email,
                            a.Recruitment.Company.PhoneNumber
                        } : null,

                        Category = a.Recruitment.Category != null ? new
                        {
                            a.Recruitment.Category.Id,
                            a.Recruitment.Category.Name
                        } : null
                    } : null
                })
                .FirstOrDefaultAsync();

            if (applypost == null) return NotFound();

            return Ok(applypost);
        }

        // POST: api/Applypost
        [HttpPost]
        public async Task<ActionResult<Applypost>> PostApplypost(Applypost applypost)
        {
            _context.Applyposts.Add(applypost);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetApplypost), new { id = applypost.Id }, applypost);
        }

        // PUT: api/Applypost/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutApplypost(int id, Applypost applypost)
        {
            if (id != applypost.Id) return BadRequest();

            _context.Entry(applypost).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Applyposts.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else throw;
            }

            return NoContent();
        }

        // DELETE: api/Applypost/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApplypost(int id)
        {
            var applypost = await _context.Applyposts.FindAsync(id);
            if (applypost == null) return NotFound();

            _context.Applyposts.Remove(applypost);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
