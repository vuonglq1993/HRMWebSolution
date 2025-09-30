using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly HrmwebContext _context;

        public CompanyController(HrmwebContext context)
        {
            _context = context;
        }

        // GET: api/Company
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetCompanies()
        {
            var companies = await _context.Companies
                .Include(c => c.User)           // join User (chủ sở hữu công ty)
                .Include(c => c.Recruitments)   // join các bài tuyển dụng
                .Select(c => new
                {
                    c.Id,
                    c.NameCompany,
                    c.Email,
                    c.PhoneNumber,
                    c.Address,
                    c.Status,
                    Owner = c.User != null ? new
                    {
                        c.User.Id,
                        c.User.FullName,
                        c.User.Email,
                        c.User.PhoneNumber
                    } : null,
                    Recruitments = c.Recruitments.Select(r => new
                    {
                        r.Id,
                        r.Title,
                        r.Salary,
                        r.Quantity,
                        r.Deadline,
                        r.Status
                    }).ToList()
                })
                .ToListAsync();

            return Ok(companies);
        }

        // GET: api/Company/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetCompany(int id)
        {
            var company = await _context.Companies
                .Include(c => c.User)
                .Include(c => c.Recruitments)
                .Where(c => c.Id == id)
                .Select(c => new
                {
                    c.Id,
                    c.NameCompany,
                    c.Email,
                    c.PhoneNumber,
                    c.Address,
                    c.Status,
                    Owner = c.User != null ? new
                    {
                        c.User.Id,
                        c.User.FullName,
                        c.User.Email,
                        c.User.PhoneNumber
                    } : null,
                    Recruitments = c.Recruitments.Select(r => new
                    {
                        r.Id,
                        r.Title,
                        r.Salary,
                        r.Quantity,
                        r.Deadline,
                        r.Status
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (company == null) return NotFound();

            return Ok(company);
        }

        // POST: api/Company
        [HttpPost]
        public async Task<ActionResult<Company>> PostCompany(Company company)
        {
            _context.Companies.Add(company);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCompany), new { id = company.Id }, company);
        }

        // PUT: api/Company/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompany(int id, Company company)
        {
            if (id != company.Id) return BadRequest();

            _context.Entry(company).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Companies.Any(e => e.Id == id))
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

        // DELETE: api/Company/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            var company = await _context.Companies.FindAsync(id);
            if (company == null) return NotFound();

            _context.Companies.Remove(company);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
