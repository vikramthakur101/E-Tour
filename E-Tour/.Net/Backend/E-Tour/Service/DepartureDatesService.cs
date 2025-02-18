
using E_Tour.Models;
using Microsoft.EntityFrameworkCore;

namespace E_Tour.Service
{
    public class DepartureDatesService : IDepartureDatesService
    {
        private readonly EtourDbContext _context;

        public DepartureDatesService(EtourDbContext context)
        {
            _context = context;
        }

        public async Task<List<string>> getDepartureDatesById(int tourid)
        {
            var dates = await _context.Departuredates.Where(d => d.TourId == tourid).Select(d => new { d.Startdate, d.Enddate }).ToListAsync();

            return dates.Select(d => $"{d.Startdate:yyyy-MM-dd} - {d.Enddate:yyyy-MM-dd}")
                            .ToList();
        }
    }
}
