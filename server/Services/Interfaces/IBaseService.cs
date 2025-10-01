using System.Collections.Generic;
using System.Threading.Tasks;

namespace server.Services.Interfaces
{
    public interface IBaseService<TCreate, TUpdate, TView>
    {
        Task<IEnumerable<TView>> GetAllAsync();
        Task<TView?> GetByIdAsync(int id);
        Task<TView> CreateAsync(TCreate dto);
        Task<TView?> UpdateAsync(int id, TUpdate dto);
        Task<bool> DeleteAsync(int id);
    }
}