using E_Tour.DTO;
using E_Tour.Models;

namespace E_Tour.Service
{
    public interface IToursService
    {
        public Task<List<ToursDTO>> getAllToursAsync(int subcategoryId);
    }
}
