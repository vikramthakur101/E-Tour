using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace E_Tour.Models;

[Table("customer")]
public partial class Customer
{
    [Key]
    [Column("customerid")]
    public long Customerid { get; set; }

    [Column("email")]
    [StringLength(255)]
    public string? email { get; set; }

    [Column("firstName")]
    [StringLength(255)]
    public string firstName { get; set; } = null!;

    [Column("lastName")]
    [StringLength(255)]
    public string lastName { get; set; } = null!;

    [Column("password")]
    [StringLength(255)]
    public string password { get; set; } = null!;

    [Column("phoneNumber1")]
    public long? phoneNumber1 { get; set; } 

    [InverseProperty("Customer")]
    public virtual ICollection<Passenger> Passengers { get; set; } = new List<Passenger>();
}
