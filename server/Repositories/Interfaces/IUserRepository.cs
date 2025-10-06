using server.Models;

namespace server.Repositories.Interfaces
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<Role?> GetRoleByNameAsync(string roleName);
    }
}