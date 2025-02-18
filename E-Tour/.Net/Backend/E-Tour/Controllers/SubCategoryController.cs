using E_Tour.Models;
using E_Tour.Service;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace E_Tour.Controllers
{
    [ApiController]
    [Route("api/subcategory")]
    [EnableCors("AllowReactApp")]
    public class SubCategoryController : ControllerBase
    {
        private readonly ISubCategoryService _subcategoryService;

        public SubCategoryController(ISubCategoryService subcategoryService)
        {
            _subcategoryService = subcategoryService;
        }

        [HttpGet("{categoryId}")]
        public async Task<ActionResult<List<Subcategorymaster>>> GetAllSubCategories(int categoryId)
        {
            Console.WriteLine($"Requested catMasterId: {categoryId}");
            var result = await _subcategoryService.GetAllSubcategoriesAsync(categoryId);
            Console.WriteLine($"Requested catMasterId: {categoryId}");

            return Ok(result);
        }
    }
}
