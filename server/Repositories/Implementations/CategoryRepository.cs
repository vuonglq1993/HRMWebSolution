using Microsoft.EntityFrameworkCore;
using server.Models;
using server.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace server.Repositories.Implementations
{
    public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(HrmwebContext context) : base(context) { }

        public override async Task<IEnumerable<Category>> GetAllAsync()
        {
            return await _context.Categories.Include(c => c.Recruitments).ToListAsync();
        }

        public override async Task<Category?> GetByIdAsync(int id)
        {
            return await _context.Categories.Include(c => c.Recruitments).FirstOrDefaultAsync(c => c.Id == id);
        }
    }
}