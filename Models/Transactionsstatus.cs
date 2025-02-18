using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace E_Tour.Models;

[Table("transactionsstatus")]
[Index("TourId", Name = "FKrm93xk7265fy0xtaaf2jq185l")]
[Index("TotalAmount", Name = "UKl406erm0b04fpeijxrap2tu93", IsUnique = true)]
[Index("BookingId", Name = "UKs2i5dc1nhj0dbsdadsc1ku2s2", IsUnique = true)]
public partial class Transactionsstatus
{
    [Key]
    [Column("transactionId")]
    public long TransactionId { get; set; }

    [Column("createdAt")]
    [MaxLength(6)]
    public DateTime CreatedAt { get; set; }

    [Column("packageName")]
    [StringLength(255)]
    public string PackageName { get; set; } = null!;

    [Column("transactionStatus", TypeName = "enum('COMPLETED','FAILED','PENDING')")]
    public string TransactionStatus { get; set; } = null!;

    [Column("updatedAt")]
    [MaxLength(6)]
    public DateTime UpdatedAt { get; set; }

    [Column("bookingID")]
    public int BookingId { get; set; }

    [Column("totalAmount")]
    public int TotalAmount { get; set; }

    [Column("tourId")]
    public int TourId { get; set; }

    [ForeignKey("BookingId")]
    [InverseProperty("transactionsstatus")]
    public virtual Bookingheader Booking { get; set; } = null!;

    [ForeignKey("TotalAmount")]
    [InverseProperty("Transactionsstatus")]
    public virtual Costmaster TotalAmountNavigation { get; set; } = null!;

    [ForeignKey("TourId")]
    [InverseProperty("Transactionsstatuses")]
    public virtual Tour Tour { get; set; } = null!;
}
