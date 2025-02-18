using Etour.DTO;
using E_Tour.Models;
using Microsoft.EntityFrameworkCore;

namespace Etour.Service
{
    public class CustomerService : ICustomerService
    {
        private readonly EtourDbContext _context;

        public CustomerService(EtourDbContext context)
        {
            _context = context;
        }


        public async Task<Customer> SaveCustomer(Customer customer)
        {
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();
            return customer;
        }
        public async Task<Customer> GetCustomerByEmailAndPassword(UserDto userdto)
        {
            return await _context.Customers
                 .FirstOrDefaultAsync(c => c.email == userdto.Email && c.password == userdto.Password);
        }

        public async Task<Customer> GetCustomerByEmail(string email)
        {
            return await _context.Customers.FirstOrDefaultAsync(c => c.email == email);
        }
    }
}
