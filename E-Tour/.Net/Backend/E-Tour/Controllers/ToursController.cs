using E_Tour.DTO;
using E_Tour.Models;
using E_Tour.Service;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace E_Tour.Controllers
{
    [ApiController]
    [Route("api/subcategory")]
    [EnableCors("AllowReactApp")]
    public class ToursController : Controller
    {
        private readonly IToursService _services;

        public ToursController(IToursService services)
        {
            _services = services;
        }

        [HttpGet("{subcategoryId}/tours")]
        public async Task<ActionResult<List<ToursDTO>>> GetAllTours(int subcategoryId)
        {
            var tours = await _services.getAllToursAsync(subcategoryId);
            Console.WriteLine("Requested SubcategoryId = " + subcategoryId);
            return Ok(tours);
        }

        //[HttpGet("/tours/search")]
        //public async Task<ActionResult<ToursDTO>> searchTour([FromQuery] String ?place, [FromQuery] DateOnly ?startdate,[FromQuery] DateOnly ?enddate)
        //{ 
        //    var tour = await _services.searchTour(place, startdate, enddate);
        //    Console.WriteLine("Searched Tour place = "+place);

        //    return Ok(tour);
        //}
    }
}
