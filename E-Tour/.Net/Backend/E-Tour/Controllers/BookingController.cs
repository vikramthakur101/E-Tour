using Etour.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Etour.Controllers
{
    [Route("api/subcategory/{subcategoryId}/tours/{tourId}/itenary/booking")]
    [ApiController]
    [EnableCors("AllowReactApp")]
    //[Authorize]
    public class BookingController : Controller
    {
        private readonly IBookingServices _services;

        public BookingController(IBookingServices services) { 
            _services = services;
        }

        //Since {tourId} is already defined at the class level, you don’t need to repeat it in [HttpGet].

        [HttpGet]
        public async Task<IActionResult> GetCost([FromRoute]int tourId)
        {
            try
            {
                var CostMasterDTO = await _services.GetCostByTourIdAsync(tourId);
                if (CostMasterDTO == null)
                {
                    return NotFound("cost not found the give tour id");
                }
                else
                {
                    return Ok(CostMasterDTO);
                }

            }
            catch
            {
                return StatusCode(500, "An error occurred.");
            }
        }
    }
}
