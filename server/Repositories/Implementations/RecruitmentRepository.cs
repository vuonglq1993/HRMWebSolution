using Microsoft.EntityFrameworkCore;
using server.Models;
using server.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace server.Repositories.Implementations
{
    public class RecruitmentRepository : GenericRepository<Recruitment>, IRecruitmentRepository
    {
        public RecruitmentRepository(HrmwebContext context) : base(context) { }

        public override async Task<IEnumerable<Recruitment>> GetAllAsync()
        {
            return await _context.Recruitments
                .Include(r => r.Company)
                .Include(r => r.Category)
                .Include(r => r.Applyposts)
                .Include(r => r.SaveJobs)
                .ToListAsync();
        }

        public override async Task<Recruitment?> GetByIdAsync(int id)
        {
            return await _context.Recruitments
                .Include(r => r.Company)
                .Include(r => r.Category)
                .Include(r => r.Applyposts)
                .Include(r => r.SaveJobs)
                .FirstOrDefaultAsync(r => r.Id == id);
        }
    }
}