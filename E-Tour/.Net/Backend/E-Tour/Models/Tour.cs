using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace E_Tour.Models;

[Table("tours")]
[Index("SubcategoryMaster", Name = "FKqvmqy6h525rs33m9cqt2a3rri")]
public partial class Tour
{
    [Key]
    [Column("tourid")]
    public int Tourid { get; set; }

    [Column("durationDays")]
    [StringLength(255)]
    public string DurationDays { get; set; } = null!;

    [Column("durationNights")]
    [StringLength(255)]
    public string DurationNights { get; set; } = null!;


    [Column("imageurl")]
    [StringLength(255)]
    public string? ImageUrl { get; set; }

    [Column("place")]
    [StringLength(255)]
    [JsonIgnore]
    public string? Place { get; set; }

    //[Column("price")]
    //public double Price { get; set; }

    [Column("tourname")]
    [StringLength(255)]
    public string? TourName { get; set; }

    [Column("subcategoryMaster")]
    [JsonIgnore]
    public int SubcategoryMaster { get; set; }

    [InverseProperty("Tour")]
    public virtual Costmaster? Costmaster { get; set; }

    [InverseProperty("Tour")]
    public virtual ICollection<Departuredate> Departuredates { get; set; } = new List<Departuredate>();

    [InverseProperty("Tour")]
    public virtual ICollection<Itenarymaster> Itenarymasters { get; set; } = new List<Itenarymaster>();

    [ForeignKey("SubcategoryMaster")]
    [InverseProperty("Tours")]
    [JsonIgnore]
    public virtual Subcategorymaster SubcategoryMasterNavigation { get; set; } = null!;

    [InverseProperty("Tour")]
    [JsonIgnore]
    public virtual ICollection<Transactionsstatus> Transactionsstatuses { get; set; } = new List<Transactionsstatus>();
}
