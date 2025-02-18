package com.example.models;

import jakarta.persistence.*;

@Entity
public class CostMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CostId")
    private int costId;

    @Column(name = "TwinSharingcost", nullable = false)
    private int twinSharingCost;

    @Column(name = "extraPersonCost", nullable = false)
    private int extraPersonCost;

    @Column(name = "childWithBed", nullable = false)
    private int childWithBed;

    @Column(name = "childWitoutBed", nullable = false) // Fixed spelling mistake
    private int childWithoutBed;

    @Column(name = "singlePersonCost")
    private int singlePersonCost;

    @OneToOne
    @JoinColumn(name = "tourId", nullable = false)
    private Tours tour;

    // Default Constructor
    public CostMaster() {}

    // Getters and Setters
    public int getCostId() {
        return costId;
    }

    public void setCostId(int costId) {
        this.costId = costId;
    }

    public int getTwinSharingCost() {
        return twinSharingCost;
    }

    public void setTwinSharingCost(int twinSharingCost) {
        this.twinSharingCost = twinSharingCost;
    }

    public int getExtraPersonCost() {
        return extraPersonCost;
    }

    public void setExtraPersonCost(int extraPersonCost) {
        this.extraPersonCost = extraPersonCost;
    }

    public int getChildWithBed() {
        return childWithBed;
    }

    public void setChildWithBed(int childWithBed) {
        this.childWithBed = childWithBed;
    }

    public int getChildWithoutBed() {
        return childWithoutBed;
    }

    public void setChildWithoutBed(int childWithoutBed) {
        this.childWithoutBed = childWithoutBed;
    }

    public int getSinglePersonCost() {
        return singlePersonCost;
    }

    public void setSinglePersonCost(int singlePersonCost) {
        this.singlePersonCost = singlePersonCost;
    }

    public Tours getTour() {
        return tour;
    }

    public void setTour(Tours tour) {
        this.tour = tour;
    }
}
