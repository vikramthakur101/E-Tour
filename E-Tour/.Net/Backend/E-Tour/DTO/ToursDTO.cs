using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace E_Tour.DTO
{
    public class ToursDTO
    {
        public int tourId { get; set; }

        public string? tourName { get; set; }

        public string durationDays { get; set; } = null!;

        public string durationNights { get; set; } = null!;
        //public double price { get; set; }
        public string? imageUrl { get; set; }


        public int SubcategoryMaster { get; set; }
    }
}
