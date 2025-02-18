package com.example.DTO;

public class CostMasterDTO {

    private int costId;
    private int twinSharingCost;
    private int extraPersonCost;
    private int childWithBed;
    private int childWithoutBed;
    private int singlePersonCost;

    public CostMasterDTO() {}

    public CostMasterDTO(int costId, int twinSharingCost, int extraPersonCost, int childWithBed, int childWithoutBed, int singlePersonCost) {
        this.costId = costId;
        this.twinSharingCost = twinSharingCost;
        this.extraPersonCost = extraPersonCost;
        this.childWithBed = childWithBed;
        this.childWithoutBed = childWithoutBed;
        this.singlePersonCost = singlePersonCost;
    }

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
}
