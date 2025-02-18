using E_Tour.Models;
using E_Tour.Service;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace E_Tour.Controllers
{
    [ApiController]
    [Route("/api/subcategory")]
    [EnableCors("AllowReactApp")]
    public class ItenaryController : Controller
    {
        private readonly IItenaryService _itenaryService;

        private readonly IDepartureDatesService _departureDates;

        public ItenaryController(IItenaryService itenaryservice, IDepartureDatesService departuredates)
        {
            _itenaryService = itenaryservice;
            _departureDates = departuredates;
        }

        [HttpGet("{categoryId}/tours/{tourid}/itenary")]
        public async Task<IActionResult> GetItenaryByTourId([FromRoute] int tourid, [FromQuery] String? lang = "en")
        {
            var details = await _itenaryService.GetItenaryDetailsByLanguageAsync(tourid, lang);
            Console.WriteLine("Selected TourId = " + tourid);
            if (details != null)
            {
                return Ok(details);
            }
            return NotFound();
        }

        [HttpGet("{categoryId}/tours/{tourid}/departures")]
        public async Task<ActionResult<List<String>>> GetDepartureDatesByTourIdAsync([FromRoute] int tourid)
        {
            var dates = await _departureDates.getDepartureDatesById(tourid);
            Console.WriteLine("Dates = " + dates);
            return Ok(dates);

        }

    }
}
