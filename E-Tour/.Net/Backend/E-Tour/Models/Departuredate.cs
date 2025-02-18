using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace E_Tour.Models;

[Table("departuredates")]
[Index("TourId", Name = "FKk3khu7tlq4njwvmkftfrkeuce")]
public partial class Departuredate
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("startdate")]
    [MaxLength(6)]
    public DateTime? Startdate { get; set; }

    [Column("tour_id")]
    public int TourId { get; set; }

    [Column("enddate")]
    [MaxLength(6)]
    public DateTime? Enddate { get; set; }

    [ForeignKey("TourId")]
    [InverseProperty("Departuredates")]
    public virtual Tour Tour { get; set; } = null!;
}
