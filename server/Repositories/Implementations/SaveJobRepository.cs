using Microsoft.EntityFrameworkCore;
using server.Models;
using server.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace server.Repositories.Implementations
{
    public class SaveJobRepository : GenericRepository<SaveJob>, ISaveJobRepository
    {
        public SaveJobRepository(HrmwebContext context) : base(context) { }

public override async Task<IEnumerable<SaveJob>> GetAllAsync()
{
    return await _context.SaveJobs
        .Include(s => s.User)
        .Include(s => s.Recruitment)
            .ThenInclude(r => r.Category) // 👈 nếu có navigation
        .Include(s => s.Recruitment)
            .ThenInclude(r => r.Company) // 👈 thêm dòng này
        .ToListAsync();
}


        public override async Task<SaveJob?> GetByIdAsync(int id)
        {
            return await _context.SaveJobs.Include(s => s.User).Include(s => s.Recruitment)
                .FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<SaveJob?> GetByUserAndRecruitmentAsync(int userId, int recruitmentId)
        {
            return await _context.SaveJobs
                .FirstOrDefaultAsync(s => s.UserId == userId && s.RecruitmentId == recruitmentId);
        }
    }
}
