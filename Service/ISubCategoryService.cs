using E_Tour.Models;

namespace E_Tour.Service
{
    public interface ISubCategoryService
    {
        public Task<List<Subcategorymaster>> GetAllSubcategoriesAsync(int catMasterId);
    }
}
