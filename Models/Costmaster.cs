using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace E_Tour.Models;

[Table("costmaster")]
[Index("TourId", Name = "UK1qg4m2fi7wc915v9six8ivvn2", IsUnique = true)]
public partial class Costmaster
{
    [Key]
    public int CostId { get; set; }

    public int TwinSharingcost { get; set; }

    [Column("childWithBed")]
    public int ChildWithBed { get; set; }

    [Column("childWitoutBed")]
    public int ChildWitoutBed { get; set; }

    [Column("extraPersonCost")]
    public int ExtraPersonCost { get; set; }

    [Column("tourId")]
    public int TourId { get; set; }

    [Column("singlePersonCost")]
    public int  SinglePersonCost { get; set; }

    [ForeignKey("TourId")]
    [InverseProperty("Costmaster")]
    public virtual Tour Tour { get; set; } = null!;

    [InverseProperty("TotalAmountNavigation")]
    public virtual Transactionsstatus? Transactionsstatus { get; set; }
}
