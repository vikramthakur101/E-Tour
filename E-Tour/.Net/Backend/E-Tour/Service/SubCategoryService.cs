using E_Tour.Models;
using Microsoft.EntityFrameworkCore;

namespace E_Tour.Service
{
    public class SubCategoryService : ISubCategoryService
    {
        private readonly EtourDbContext _etourDbContext;

        public SubCategoryService(EtourDbContext etourDbContext)
        {
            _etourDbContext = etourDbContext;
        }

        public async Task<List<Subcategorymaster>> GetAllSubcategoriesAsync(int catMasterId)
        {
            return await _etourDbContext.Subcategorymasters.Where(sub => sub.CatMasterId == catMasterId).ToListAsync();
        }

    }
}
