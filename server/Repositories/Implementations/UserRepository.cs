using Microsoft.EntityFrameworkCore;
using server.Models;
using server.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace server.Repositories.Implementations
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(HrmwebContext context) : base(context) { }

        public override async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _context.Users
                .Include(u => u.Role)
                .Include(u => u.Cvs)
                .Include(u => u.Companies)
                .Include(u => u.Applyposts)
                .Include(u => u.FollowCompanies)
                .Include(u => u.SaveJobs)
                .ToListAsync();
        }

        public override async Task<User?> GetByIdAsync(int id)
        {
            return await _context.Users
                .Include(u => u.Role)
                .Include(u => u.Cvs)
                .Include(u => u.Companies)
                .Include(u => u.Applyposts)
                .Include(u => u.FollowCompanies)
                .Include(u => u.SaveJobs)
                .FirstOrDefaultAsync(u => u.Id == id);
        }
    }
}