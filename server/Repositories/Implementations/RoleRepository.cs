using Microsoft.EntityFrameworkCore;
using server.Models;
using server.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace server.Repositories.Implementations
{
    public class RoleRepository : GenericRepository<Role>, IRoleRepository
    {
        public RoleRepository(HrmwebContext context) : base(context) { }

        public override async Task<IEnumerable<Role>> GetAllAsync()
        {
            return await _context.Roles.Include(r => r.Users).ToListAsync();
        }

        public override async Task<Role?> GetByIdAsync(int id)
        {
            return await _context.Roles.Include(r => r.Users).FirstOrDefaultAsync(r => r.Id == id);
        }
    }
}