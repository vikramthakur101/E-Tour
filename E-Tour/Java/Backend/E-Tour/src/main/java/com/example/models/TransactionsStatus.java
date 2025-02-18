package com.example.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class TransactionsStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;  // Changed to Long for auto-generated numeric IDs
    
    @Column(nullable = false)
    private String packageName;
    
    @Enumerated(EnumType.STRING) // Using Enum for transaction status for type safety
    @Column(nullable = false)
    private TransactionStatus transactionStatus;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;  // Timestamp for creation
    
    @Column(nullable = false)
    private LocalDateTime updatedAt;  // Timestamp for updates

    @OneToOne  // One booking can have many transactions
    @JoinColumn(name = "bookingID", nullable = false)
    private BookingHeader bookingheader;
    
    @ManyToOne // One tour can be booked by multiple customers
    @JoinColumn(name = "tourId", nullable = false)
    private Tours tour;

    // Getters and Setters with validation

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Long getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Long transactionId) {
        this.transactionId = transactionId;
    }
    
    @OneToOne  // One booking can have many transactions
    @JoinColumn(name = " totalAmount", nullable = false)
    private CostMaster costmaster;
    
     
    
    public String getPackageName() {
        return packageName;
    }

    public void setPackageName(String packageName) {
        this.packageName = packageName;
    }

    public TransactionStatus getTransactionStatus() {
        return transactionStatus;
    }

    public void setTransactionStatus(TransactionStatus transactionStatus) {
        this.transactionStatus = transactionStatus;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public BookingHeader getBookingheader() {
        return bookingheader;
    }

    public void setBookingheader(BookingHeader bookingheader) {
        this.bookingheader = bookingheader;
    }

    public Tours getTour() {
        return tour;
    }

    public void setTour(Tours tour) {
        this.tour = tour;
    }

    // Enum for TransactionStatus
    public enum TransactionStatus {
        PENDING, COMPLETED, FAILED
    }

    // Example method to change transaction status
    public void markAsCompleted() {
        if (this.transactionStatus.equals(TransactionStatus.PENDING)) {
            this.transactionStatus = TransactionStatus.COMPLETED;
        } else {
            throw new IllegalStateException("Transaction can't be marked as completed.");
        }
    }
}
