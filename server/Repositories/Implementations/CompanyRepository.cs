using Microsoft.EntityFrameworkCore;
using server.Models;
using server.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace server.Repositories.Implementations
{
    public class CompanyRepository : GenericRepository<Company>, ICompanyRepository
    {
        public CompanyRepository(HrmwebContext context) : base(context) { }

        public override async Task<IEnumerable<Company>> GetAllAsync()
        {
            return await _context.Companies
                .Include(c => c.User)
                .Include(c => c.Recruitments)
                .Include(c => c.FollowCompanies)
                .ToListAsync();
        }

        public override async Task<Company?> GetByIdAsync(int id)
        {
            return await _context.Companies
                .Include(c => c.User)
                .Include(c => c.Recruitments)
                .Include(c => c.FollowCompanies)
                .FirstOrDefaultAsync(c => c.Id == id);
        }
    }
}