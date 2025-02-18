using Etour.DTO;
using E_Tour.Models;

namespace Etour.Service
{
     public interface ICustomerService

    {
        Task<Customer> SaveCustomer(Customer customer);
        Task<Customer> GetCustomerByEmailAndPassword(UserDto  userdto);
        Task<Customer> GetCustomerByEmail(string email);
    }
}
