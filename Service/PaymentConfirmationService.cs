using E_Tour.Models;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using ZstdSharp.Unsafe;

namespace E_Tour.Service
{
    public class PaymentConfirmationService : IPaymentConfirmation
    {
        private readonly EtourDbContext _context;
        public PaymentConfirmationService(EtourDbContext etourDbContext)
        {
            _context = etourDbContext;
        }
        public async Task<ActionResult<string>> createBooking(Bookingheader bookingdetails)
        {
          
            Bookingheader booking = new Bookingheader
            {
                bookingDate = bookingdetails.bookingDate,
                customerId = bookingdetails.customerId,
                tourId = bookingdetails.tourId,
                tourAmount = bookingdetails.tourAmount,
                totalAmount = bookingdetails.totalAmount,
                numberOfPassengers = bookingdetails.numberOfPassengers,
                tourname = bookingdetails.tourname,
                customername = bookingdetails.customername,
                bookingStatus = BookingStatus.CONFIRMED,
                paymentStatus = PaymentStatus.CONFIRMED,
                transactionId= GenerateTransactionId(),
                email= bookingdetails.email
            };

            Console.WriteLine("Received Booking Data: ");

            var message = await _context.AddAsync(booking);
            await _context.SaveChangesAsync();
            return "Booking saved successfully!";

        }

        private string GenerateTransactionId()
        {
            return "TCN-" + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds() + "-" + new Random().Next(10000);
        }
        

    }
}
