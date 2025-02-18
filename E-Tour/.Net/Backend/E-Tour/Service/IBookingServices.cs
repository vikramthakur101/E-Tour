using Etour.DTO;

namespace Etour.Service
{
    public interface IBookingServices
    {
    
            Task<CostMasterDTO> GetCostByTourIdAsync(int tourId);
}
}
