using E_Tour.DTO;
using E_Tour.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_Tour.Service
{
    public class ItenaryService : IItenaryService
    {
        private readonly EtourDbContext _context;

        public ItenaryService(EtourDbContext context)
        {
            _context = context;
        }
        public async Task<List<ItenaryDto>> GetItenaryDetailsByLanguageAsync(int tourid, string? lang)
        {
            lang ??= "en"; // Default to English if not provided

            var itineraryList = await _context.Itenarymasters
                .Where(i => i.TourId == tourid)
                .ToListAsync();

            var details = itineraryList.Select(i => new ItenaryDto
            {
                Description = lang switch
                {
                    "es" => i.DetailsEs ?? "",
                    "fr" => i.DetailsFr ?? "",
                    "hi" => i.DetailsHi ?? "",
                    "mr" => i.DetailsMr ?? "",
                    _ => i.description ?? "" // Default to English
                },
                ImageUrl = i.Images,
                DayNo = i.DayNo,
                ItenaryDetails = lang switch
                {
                    "es" => i.DetailsEs ?? "",
                    "fr" => i.DetailsFr ?? "",
                    "hi" => i.DetailsHi ?? "",
                    "mr" => i.DetailsMr ?? "",
                    _ => i.description ?? "" // Default to English
                }
            }).ToList();

            return details;
        }





    }
}
