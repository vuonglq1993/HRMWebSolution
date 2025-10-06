using server.Models;

namespace server.Repositories.Interfaces
{
    public interface ISaveJobRepository : IGenericRepository<SaveJob>
    {
        Task<SaveJob?> GetByUserAndRecruitmentAsync(int userId, int recruitmentId);

    }
}