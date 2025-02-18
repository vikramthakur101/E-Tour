package com.example.DTO;

public class ItenaryResponse {
    private String description;
    private String imageUrl;
    private int dayNo;
    private String itenaryDetails;

    public ItenaryResponse(String description, String imageUrl, int dayNo, String itenaryDetails) {
        this.description = description;
        this.imageUrl = imageUrl;
        this.dayNo = dayNo;
        this.itenaryDetails = itenaryDetails;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public int getDayNo() {
        return dayNo;
    }

    public void setDayNo(int dayNo) {
        this.dayNo = dayNo;
    }

    public String getItenaryDetails() {
        return itenaryDetails;
    }

    public void setItenaryDetails(String itenaryDetails) {
        this.itenaryDetails = itenaryDetails;
    }

}