
namespace E_Tour.Service
{
    public interface IDepartureDatesService
    {
        Task<List<String>> getDepartureDatesById(int tourid);
    }
}
