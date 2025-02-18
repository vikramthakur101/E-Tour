using E_Tour.DTO;
using Microsoft.AspNetCore.Mvc;

namespace E_Tour.Service
{
    public interface IItenaryService
    {
        public  Task<List<ItenaryDto>> GetItenaryDetailsByLanguageAsync(int tourid, string? lang);
    }
}
