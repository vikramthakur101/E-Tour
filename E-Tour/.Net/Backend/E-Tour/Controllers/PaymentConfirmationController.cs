using E_Tour.Models;
using E_Tour.Service;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace E_Tour.Controllers
{
    [ApiController]
    [Route("api/subcategory/tours/Booking/BookingConfirmation")]
    [EnableCors("AllowReactApp")]
    public class PaymentConfirmationController : Controller
    {
        private readonly IPaymentConfirmation _paymentconfirmation;
        public PaymentConfirmationController(IPaymentConfirmation paymentconfirmation)
        {
            _paymentconfirmation = paymentconfirmation;
        }

        [HttpPost("save")]
        public async Task<ActionResult<string>> confirmBooking([FromBody] Bookingheader bookingheader)
        {
            Console.WriteLine("Recieved Booking Data = "+bookingheader);
            var message = await _paymentconfirmation.createBooking(bookingheader);
            return Ok(message);
        }


    }
}
