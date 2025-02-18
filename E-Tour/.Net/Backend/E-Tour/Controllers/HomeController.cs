using E_Tour.Models;
using E_Tour.Service;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace E_Tour.Controllers
{
    [Route("api")]
    [ApiController]
    [EnableCors("AllowReactApp")]
    public class HomeController : Controller
    {
        private readonly IHomeService _homeservice;

        public HomeController(IHomeService homeservice)
        {
            _homeservice = homeservice;
        }


        [HttpGet]
        public async Task<ActionResult<List<Categorymaster>>> GetAllCategories()
        {
            return Ok(await _homeservice.GetAllCategoriesAsync());
        }

        [HttpGet("{tourId}")]
        public async Task<ActionResult<List<Itenarymaster>>> GetAllItenaries(int tourId)
        {
            var itenaries = await _homeservice.GetAllItenariesAsync(tourId);
            if (itenaries == null || itenaries.Count == 0)
                return NotFound();
            return Ok(itenaries);
        }
    }
}