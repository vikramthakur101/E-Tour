using E_Tour.Models;
using Microsoft.AspNetCore.Mvc;

namespace E_Tour.Service
{
    public interface IPaymentConfirmation
    {
        Task<ActionResult<string>> createBooking(Bookingheader bookingheader);
    }
}
