using E_Tour.Models;
using Etour.DTO;
using Etour.Service;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Etour.Controllers
{
        [ApiController]
        [Route("api/customers")]
        [EnableCors("AllowReactApp")]

    public class CustomerController : Controller
    {
        
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService) // Constructor Injection
        {
            _customerService = customerService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<Customer>> RegisterCustomer([FromBody] Customer customer)
        {
            Console.WriteLine("inside the Register customer");
            var result = await _customerService.SaveCustomer(customer);
            return Ok(result);
        }

        [HttpGet("check/{email}")]
        public async Task<ActionResult<Customer>> GetCustomerDetails(string email)
        {
            try
            {
                var customer = await _customerService.GetCustomerByEmail(email);
                if (customer != null)
                {
                    return Ok(customer);
                }
                return NotFound();
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }


        [HttpPost("login")]
        public async Task<ActionResult<Dictionary<string, string>>> LoginCustomer([FromBody] UserDto userdto)
        {
            var found = await _customerService.GetCustomerByEmailAndPassword(userdto);

            if (found != null)
            {
                return Ok(new Dictionary<string, string>
                {
                    { "message", "Login Successful" }
                });
            }

            return Unauthorized(new Dictionary<string, string>
            {
                { "message", "Invalid email or password." }
            });
        }


    }
}
