using Microsoft.EntityFrameworkCore;
using server.Models;
using server.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace server.Repositories.Implementations
{
    public class ApplypostRepository : GenericRepository<Applypost>, IApplypostRepository
    {
        public ApplypostRepository(HrmwebContext context) : base(context) { }

        public override async Task<IEnumerable<Applypost>> GetAllAsync()
        {
            return await _context.Applyposts.Include(a => a.User).Include(a => a.Recruitment).ToListAsync();
        }

        public override async Task<Applypost?> GetByIdAsync(int id)
        {
            return await _context.Applyposts.Include(a => a.User).Include(a => a.Recruitment).FirstOrDefaultAsync(a => a.Id == id);
        }
    }
}