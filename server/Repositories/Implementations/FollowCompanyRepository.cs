using Microsoft.EntityFrameworkCore;
using server.Models;
using server.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace server.Repositories.Implementations
{
    public class FollowCompanyRepository : GenericRepository<FollowCompany>, IFollowCompanyRepository
    {
        public FollowCompanyRepository(HrmwebContext context) : base(context) { }

        public override async Task<IEnumerable<FollowCompany>> GetAllAsync()
        {
            return await _context.FollowCompanies.Include(f => f.User).Include(f => f.Company).ToListAsync();
        }

        public override async Task<FollowCompany?> GetByIdAsync(int id)
        {
            return await _context.FollowCompanies.Include(f => f.User).Include(f => f.Company).FirstOrDefaultAsync(f => f.Id == id);
        }
    }
}