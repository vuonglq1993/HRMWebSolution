using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FollowCompanyController : ControllerBase
    {
        private readonly HrmwebContext _context;

        public FollowCompanyController(HrmwebContext context)
        {
            _context = context;
        }

        // GET: api/FollowCompany
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetFollowCompanies()
        {
            var follows = await _context.Follow_companies
                .Include(fc => fc.User)
                .Include(fc => fc.Company)
                .Select(fc => new
                {
                    fc.Id,
                    User = fc.User != null ? new
                    {
                        fc.User.Id,
                        fc.User.FullName,
                        fc.User.Email,
                        fc.User.PhoneNumber
                    } : null,
                    Company = fc.Company != null ? new
                    {
                        fc.Company.Id,
                        fc.Company.NameCompany,
                        fc.Company.Email,
                        fc.Company.PhoneNumber,
                        fc.Company.Address
                    } : null
                })
                .ToListAsync();

            return Ok(follows);
        }

        // GET: api/FollowCompany/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetFollowCompany(int id)
        {
            var follow = await _context.Follow_companies
                .Include(fc => fc.User)
                .Include(fc => fc.Company)
                .Where(fc => fc.Id == id)
                .Select(fc => new
                {
                    fc.Id,
                    User = fc.User != null ? new
                    {
                        fc.User.Id,
                        fc.User.FullName,
                        fc.User.Email,
                        fc.User.PhoneNumber
                    } : null,
                    Company = fc.Company != null ? new
                    {
                        fc.Company.Id,
                        fc.Company.NameCompany,
                        fc.Company.Email,
                        fc.Company.PhoneNumber,
                        fc.Company.Address
                    } : null
                })
                .FirstOrDefaultAsync();

            if (follow == null) return NotFound();

            return Ok(follow);
        }

        // POST: api/FollowCompany
        [HttpPost]
        public async Task<ActionResult<FollowCompany>> PostFollowCompany(FollowCompany followCompany)
        {
            _context.Follow_companies.Add(followCompany);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFollowCompany), new { id = followCompany.Id }, followCompany);
        }

        // PUT: api/FollowCompany/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFollowCompany(int id, FollowCompany followCompany)
        {
            if (id != followCompany.Id) return BadRequest();

            _context.Entry(followCompany).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Follow_companies.Any(e => e.Id == id))
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

        // DELETE: api/FollowCompany/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFollowCompany(int id)
        {
            var followCompany = await _context.Follow_companies.FindAsync(id);
            if (followCompany == null) return NotFound();

            _context.Follow_companies.Remove(followCompany);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
