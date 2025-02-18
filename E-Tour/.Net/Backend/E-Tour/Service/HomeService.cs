using E_Tour.Models;
using Microsoft.EntityFrameworkCore;

namespace E_Tour.Service
{
    public class HomeService : IHomeService
    {
        private readonly EtourDbContext _etourdbcontext;

        public HomeService(EtourDbContext etourdbcontext)
        {
            _etourdbcontext = etourdbcontext;
        }
        public async Task<List<Categorymaster>> GetAllCategoriesAsync()
        {
            return await _etourdbcontext.Categorymasters.ToListAsync();
        }

        public async Task<List<Itenarymaster>> GetAllItenariesAsync(int tourId)
        {
            return await _etourdbcontext.Itenarymasters.Where(i => i.TourId == tourId).ToListAsync();
        }

    }
}
