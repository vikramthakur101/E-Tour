using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace E_Tour.Models;

[Table("bookingheader")]
public partial class Bookingheader
{
    [Key]
    [Column("bookingID")]
    public int bookingId { get; set; }

    [Column("bookingDate")]
    [DataType(DataType.Date)]
    public DateTime bookingDate { get; set; }

    [Column("bookingStatus", TypeName = "enum('CANCELED','CONFIRMED','PENDING')")]
    public BookingStatus bookingStatus { get; set; }

    [Column("customerId")]
    public int customerId { get; set; }

    [Column("customername")]
    [StringLength(255)]
    public string? customername { get; set; }

    [Column("numberOfPassengers")]
    public int? numberOfPassengers { get; set; }

    [Column("paymentStatus", TypeName = "enum('COMPLETED','FAILED','PENDING')")]
    public PaymentStatus paymentStatus { get; set; }

    [Column("totalAmount")]
    public double totalAmount { get; set; }

    [Column("tourAmount")]
    public double tourAmount { get; set; }

    [Column("tourId")]
    public int tourId { get; set; }

    [Column("tourname")]
    [StringLength(255)]
    public string? tourname { get; set; }

    [Column("transactionId")]
    [StringLength(255)]
    public string? transactionId { get; set; }

    [Column("email")]
    [StringLength(255)]
    public string? email { get; set; }

    [InverseProperty("Booking")]
    public virtual Transactionsstatus? transactionsstatus { get; set; }

    public override string ToString()
    {
        return $"BookingID: {bookingId}, Date: {bookingDate}, Status: {bookingStatus}, " +
               $"Customer: {customername} (ID: {customerId}), Passengers: {numberOfPassengers}, " +
               $"Payment: {paymentStatus}, Total: {totalAmount}, Tour: {tourname} (ID: {tourId}), " +
               $"Transaction: {transactionId}, Email: {email}";
    }

}
