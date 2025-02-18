using E_Tour.Models;
using Etour.DTO;
using Microsoft.EntityFrameworkCore;

namespace Etour.Service
{
    public class BookingSerivce : IBookingServices
    {   
        private readonly EtourDbContext _context;

        public BookingSerivce(EtourDbContext context)
        {
            _context = context;
        }
        public async Task<CostMasterDTO> GetCostByTourIdAsync(int tourId)
        {
            var costMaster = await _context.Costmasters
                .Include(c => c.Tour)
                .FirstOrDefaultAsync(c => c.Tour.Tourid == tourId);

            if (costMaster == null) return null;

            return new CostMasterDTO
            {
                CostId = costMaster.CostId,
                twinSharingcost = costMaster.TwinSharingcost,
                extraPersonCost = costMaster.ExtraPersonCost,
                childWithBed = costMaster.ChildWithBed,
                childWitoutBed = costMaster.ChildWitoutBed,
                singlePersonCost=costMaster.SinglePersonCost
            };
        }
    }
}
