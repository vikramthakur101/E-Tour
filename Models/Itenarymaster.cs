using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace E_Tour.Models;

[Table("itenarymaster")]
[Index("TourId", Name = "FK_tour_itenary")]
public partial class Itenarymaster
{
    [Key]
    public int ItenaryId { get; set; }

    [StringLength(1000)]
    public string description { get; set; } = null!;

    [Column("dayNo")]
    public int DayNo { get; set; }

    [Column("images")]
    [StringLength(255)]
    public string? Images { get; set; }

    [Column("tour_id")]
    public int TourId { get; set; }

    [Column("detailsEs")]
    [StringLength(1000)]
    public string? DetailsEs { get; set; }

    [Column("detailsFr")]
    [StringLength(1000)]
    public string? DetailsFr { get; set; }

    [Column("detailsHi")]
    [StringLength(1000)]
    public string? DetailsHi { get; set; }

    [Column("detailsMr")]
    [StringLength(1000)]
    public string? DetailsMr { get; set; }

    [ForeignKey("TourId")]
    [InverseProperty("Itenarymasters")]
    public virtual Tour Tour { get; set; } = null!;
}
