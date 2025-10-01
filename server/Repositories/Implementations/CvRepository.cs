using Microsoft.EntityFrameworkCore;
using server.Models;
using server.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace server.Repositories.Implementations
{
    public class CvRepository : GenericRepository<Cv>, ICvRepository
    {
        public CvRepository(HrmwebContext context) : base(context) { }

        public override async Task<IEnumerable<Cv>> GetAllAsync()
        {
            return await _context.Cvs.Include(cv => cv.User).ToListAsync();
        }

        public override async Task<Cv?> GetByIdAsync(int id)
        {
            return await _context.Cvs.Include(cv => cv.User).FirstOrDefaultAsync(cv => cv.Id == id);
        }
    }
}