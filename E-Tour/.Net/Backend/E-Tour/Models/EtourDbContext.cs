using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace E_Tour.Models;

public partial class EtourDbContext : DbContext
{
    public EtourDbContext()
    {
    }

    public EtourDbContext(DbContextOptions<EtourDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Bookingheader> Bookingheaders { get; set; }

    public virtual DbSet<Categorymaster> Categorymasters { get; set; }

    public virtual DbSet<Costmaster> Costmasters { get; set; }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Departuredate> Departuredates { get; set; }

    public virtual DbSet<Itenarymaster> Itenarymasters { get; set; }

    public virtual DbSet<Passenger> Passengers { get; set; }

    public virtual DbSet<Subcategorymaster> Subcategorymasters { get; set; }

    public virtual DbSet<Tour> Tours { get; set; }

    public virtual DbSet<Transactionsstatus> Transactionsstatuses { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;database=etour;user=root;password=root", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.39-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Bookingheader>(entity =>
        {
            entity.HasKey(e => e.bookingId).HasName("PRIMARY");
        });

        modelBuilder.Entity<Categorymaster>(entity =>
        {
            entity.HasKey(e => e.Categoryid).HasName("PRIMARY");
        });

        modelBuilder.Entity<Costmaster>(entity =>
        {
            entity.HasKey(e => e.CostId).HasName("PRIMARY");

            entity.HasOne(d => d.Tour).WithOne(p => p.Costmaster)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK327r3j8n8q2o4jo4e0174mlbq");
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.Customerid).HasName("PRIMARY");
        });

        modelBuilder.Entity<Departuredate>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.HasOne(d => d.Tour).WithMany(p => p.Departuredates)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKk3khu7tlq4njwvmkftfrkeuce");
        });

        modelBuilder.Entity<Itenarymaster>(entity =>
        {
            entity.HasKey(e => e.ItenaryId).HasName("PRIMARY");

            entity.HasOne(d => d.Tour).WithMany(p => p.Itenarymasters)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_tour_itenary");
        });

        modelBuilder.Entity<Passenger>(entity =>
        {
            entity.HasKey(e => e.Paxid).HasName("PRIMARY");

            entity.HasOne(d => d.Customer).WithMany(p => p.Passengers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK94glo3g96s4casn80nqs3ibdu");
        });

        modelBuilder.Entity<Subcategorymaster>(entity =>
        {
            entity.HasKey(e => e.SubCatMasterId).HasName("PRIMARY");

            entity.HasOne(d => d.CatMaster).WithMany(p => p.Subcategorymasters)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKdqaal5ktonkpbtrg032utwed1");
        });

        modelBuilder.Entity<Tour>(entity =>
        {
            entity.HasKey(e => e.Tourid).HasName("PRIMARY");

            entity.HasOne(d => d.SubcategoryMasterNavigation).WithMany(p => p.Tours)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKqvmqy6h525rs33m9cqt2a3rri");
        });

        modelBuilder.Entity<Transactionsstatus>(entity =>
        {
            entity.HasKey(e => e.TransactionId).HasName("PRIMARY");

            entity.HasOne(d => d.Booking).WithOne(p => p.transactionsstatus)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKjmq5o024vo6epjojp4fcf8dm0");

            entity.HasOne(d => d.TotalAmountNavigation).WithOne(p => p.Transactionsstatus)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKdk3alo9s6dc02mcefyj2gt79m");

            entity.HasOne(d => d.Tour).WithMany(p => p.Transactionsstatuses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FKrm93xk7265fy0xtaaf2jq185l");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
