using E_Tour.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Reflection.Metadata.Ecma335;
using System.Text.Json;
using System.Text;
using ZstdSharp.Unsafe;

namespace E_Tour.Service
{
    public class PaymentConfirmationService : IPaymentConfirmation
    {
        private readonly EtourDbContext _context;
        private readonly HttpClient _httpClient;
        private const string EmailServiceUrl = "http://localhost:8080/email";

        public PaymentConfirmationService(EtourDbContext etourDbContext, HttpClient httpClient)
        {
            _context = etourDbContext;
            _httpClient = httpClient;
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
            await SendEmailNotification(booking);
            return "Booking saved successfully!";

        }

        private async Task SendEmailNotification(Bookingheader booking)
        {
            // Prepare the email payload
            var emailRequest = new
            {
                recipient = booking.email,
                subject = $"Booking Confirmation: {booking.tourname}",
                customerName = booking.customername,
                tourName = booking.tourname,
                bookingDate = booking.bookingDate.ToString("yyyy-MM-dd"),
                totalAmount1 = booking.totalAmount,
                transactionId1 = booking.transactionId,
                numberOfPassenger1s = booking.numberOfPassengers,  
                tourAmount1 = booking.tourAmount,                  
                bookingStatus = booking.bookingStatus.ToString() 
            };

            

            // Serialize the payload to JSON
            var jsonPayload = JsonSerializer.Serialize(emailRequest);

                // Create the HTTP content with headers
                var httpContent = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

                // Make the HTTP POST request to the Java email service
                var response = await _httpClient.PostAsync($"{EmailServiceUrl}/send", httpContent);

                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine("Email sent successfully.");
                }
                else
                {
                    Console.WriteLine($"Failed to send email: {response.StatusCode}");
                }
            }


          
        private string GenerateTransactionId()
        {
            return "TCN-" + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds() + "-" + new Random().Next(10000);
        }

    }
}
