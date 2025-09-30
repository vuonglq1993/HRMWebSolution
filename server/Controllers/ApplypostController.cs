using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models; // namespace chứa DbContext + Entities

namespace server.Controllers;


    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly HrmwebContext _context;

        public CategoryController(HrmwebContext context)
        {
            _context = context;
        }

        // GET: api/Category
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategorys()
        {
            return await _context.Categorys.ToListAsync();
        }

        // GET: api/Category/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            var Category = await _context.Categorys.FindAsync(id);

            if (Category == null)
            {
                return NotFound();
            }

            return Category;
        }

        // POST: api/Category
        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory(Category Category)
        {
            _context.Categorys.Add(Category);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCategory), new { id = Category.Id }, Category);
        }

        // PUT: api/Category/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, Category Category)
        {
            if (id != Category.Id)
            {
                return BadRequest();
            }

            _context.Entry(Category).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Categorys.Any(e => e.Id == id))
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

        // DELETE: api/Category/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var Category = await _context.Categorys.FindAsync(id);
            if (Category == null)
            {
                return NotFound();
            }

            _context.Categorys.Remove(Category);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
