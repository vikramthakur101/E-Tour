    using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace E_Tour.Models;

[Table("subcategorymaster")]
[Index("CatMasterId", Name = "FKdqaal5ktonkpbtrg032utwed1")]
public partial class Subcategorymaster
{
    [Key]
    [Column("subCatMasterId")]
    public int SubCatMasterId { get; set; }

    [Column("flag", TypeName = "bit(1)")]
    public ulong Flag { get; set; }

    [Column("subCatId")]
    [StringLength(3)]
    public string SubCatId { get; set; } = null!;

    [Column("subCatImagePath")]
    [StringLength(255)]
    public string? SubCatImagePath { get; set; }

    [Column("subCatName")]
    [StringLength(255)]
    public string SubCatName { get; set; } = null!;

    [Column("catMasterId")]
    public int CatMasterId { get; set; }

    [ForeignKey("CatMasterId")]
    [InverseProperty("Subcategorymasters")]
    public virtual Categorymaster CatMaster { get; set; } = null!;

    [InverseProperty("SubcategoryMasterNavigation")]
    [JsonIgnore]
    public virtual ICollection<Tour> Tours { get; set; } = new List<Tour>();
}
