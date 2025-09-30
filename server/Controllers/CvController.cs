using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CvController : ControllerBase
    {
        private readonly HrmwebContext _context;

        public CvController(HrmwebContext context)
        {
            _context = context;
        }

        // GET: api/Cv
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetCvs()
        {
            var cvs = await _context.Cvs
                .Include(c => c.User)
                .Select(c => new
                {
                    c.Id,
                    c.FileName,
                    User = c.User != null ? new
                    {
                        c.User.Id,
                        c.User.FullName,
                        c.User.Email,
                        c.User.PhoneNumber
                    } : null
                })
                .ToListAsync();

            return Ok(cvs);
        }

        // GET: api/Cv/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetCv(int id)
        {
            var cv = await _context.Cvs
                .Include(c => c.User)
                .Where(c => c.Id == id)
                .Select(c => new
                {
                    c.Id,
                    c.FileName,
                    User = c.User != null ? new
                    {
                        c.User.Id,
                        c.User.FullName,
                        c.User.Email,
                        c.User.PhoneNumber
                    } : null
                })
                .FirstOrDefaultAsync();

            if (cv == null)
            {
                return NotFound();
            }

            return Ok(cv);
        }

        // POST: api/Cv
        [HttpPost]
        public async Task<ActionResult<Cv>> PostCv(Cv cv)
        {
            _context.Cvs.Add(cv);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCv), new { id = cv.Id }, cv);
        }

        // PUT: api/Cv/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCv(int id, Cv cv)
        {
            if (id != cv.Id)
            {
                return BadRequest();
            }

            _context.Entry(cv).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Cvs.Any(e => e.Id == id))
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

        // DELETE: api/Cv/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCv(int id)
        {
            var cv = await _context.Cvs.FindAsync(id);
            if (cv == null)
            {
                return NotFound();
            }

            _context.Cvs.Remove(cv);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
