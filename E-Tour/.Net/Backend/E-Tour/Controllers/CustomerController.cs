using E_Tour.Models;
using Etour.DTO;
using Etour.Service;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Etour.Controllers
{
        [ApiController]
        [Route("api/customers")]
        [EnableCors("AllowReactApp")]

    public class CustomerController : Controller
    {
        
        private readonly ICustomerService _customerService;
        private readonly IConfiguration _configuration;

        public CustomerController(ICustomerService customerService, IConfiguration configuration) // Constructor Injection
        {
            _customerService = customerService;
            _configuration = configuration;
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
            var existingUser = await _customerService.GetCustomerByEmailAndPassword(userdto);

            if (existingUser != null)
            {
                var claims = new[] {
        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString()),

        new Claim("username", userdto.Email),
};
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(_configuration["Jwt:Issuer"], _configuration["Jwt:Audience"], claims, expires: DateTime.UtcNow.AddMinutes(3), signingCredentials: signIn);

                var tokenResponse = new JwtSecurityTokenHandler().WriteToken(token);


                Dictionary<string, string> response = new Dictionary<string, string>();
                response.Add("token", tokenResponse);
                response.Add("email", existingUser.email);

                return Ok(response);
            }

            return Unauthorized(new Dictionary<string, string>
            {
                { "message", "Invalid email or password." }
            });
        }


    }
}
