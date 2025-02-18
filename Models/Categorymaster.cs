using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace E_Tour.Models;

[Table("categorymaster")]
public partial class Categorymaster
{
    [Key]
    [Column("categoryid")]
    public int Categoryid { get; set; }

    [Column("Category_Name")]
    [StringLength(100)]
    public string CategoryName { get; set; } = null!;

    [JsonIgnore]
    [Column(TypeName = "bit(1)")]
    public ulong Flag { get; set; }

    [Column("subcategoryid")]
    public int Subcategoryid { get; set; }

    [Column("categoryImagePath")]
    [StringLength(255)]
    public string CategoryImagePath { get; set; } = null!;

    [InverseProperty("CatMaster")]
    [JsonIgnore]
    public virtual ICollection<Subcategorymaster> Subcategorymasters { get; set; } = new List<Subcategorymaster>();
}
