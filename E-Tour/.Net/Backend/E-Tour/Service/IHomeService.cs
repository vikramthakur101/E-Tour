using E_Tour.Models;

namespace E_Tour.Service
{
    public interface IHomeService
    {
        Task<List<Categorymaster>> GetAllCategoriesAsync();
        Task<List<Itenarymaster>> GetAllItenariesAsync(int tourId);
    }
}
