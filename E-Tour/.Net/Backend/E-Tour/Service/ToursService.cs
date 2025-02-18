using E_Tour.DTO;
using E_Tour.Models;
using Microsoft.EntityFrameworkCore;

namespace E_Tour.Service
{
    public class ToursService : IToursService
    {
        private readonly EtourDbContext _etourDbContext;

        public ToursService(EtourDbContext context)
        {
            _etourDbContext = context;
        }


        public async Task<List<ToursDTO>> getAllToursAsync(int subcategoryId)
        {
            return await _etourDbContext.Tours.Where(i => i.SubcategoryMaster == subcategoryId).
                Select(t => new ToursDTO
                {
                    tourId = t.Tourid,
                    tourName = t.TourName,
                    durationDays = t.DurationDays,
                    durationNights = t.DurationNights,
                    //price = t.Price,
                    imageUrl = t.ImageUrl,
                    SubcategoryMaster = t.SubcategoryMaster
                }).ToListAsync();
        }
    }
}
