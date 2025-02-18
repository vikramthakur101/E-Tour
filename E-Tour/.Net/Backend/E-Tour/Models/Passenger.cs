using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace E_Tour.Models;

[Table("passenger")]
[Index("Customerid", Name = "FK94glo3g96s4casn80nqs3ibdu")]
public partial class Passenger
{
    [Key]
    public int Paxid { get; set; }

    [Column("age")]
    public int? Age { get; set; }

    [Column("cost")]
    public int? Cost { get; set; }

    [Column("firstName")]
    [StringLength(255)]
    public string? FirstName { get; set; }

    [Column("lastName")]
    [StringLength(255)]
    public string? LastName { get; set; }

    [Column("passengerType")]
    [StringLength(255)]
    public string? PassengerType { get; set; }

    [Column("phoneNumber")]
    public long? PhoneNumber { get; set; }

    [Column("customerid")]
    public long Customerid { get; set; }

    public double Amount { get; set; }

    [ForeignKey("Customerid")]
    [InverseProperty("Passengers")]
    public virtual Customer Customer { get; set; } = null!;
}
