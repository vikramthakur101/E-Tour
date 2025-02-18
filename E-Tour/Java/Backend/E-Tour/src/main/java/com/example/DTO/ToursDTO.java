package com.example.DTO;

import java.time.LocalDate;

public class ToursDTO {

	private int tourId;
	private String place;
	private String tourName;
	private String imageUrl;
	private String durationDays;
	private String durationNights;
	private int price;
	private LocalDate startDate;
	private LocalDate endDate;
	private int subcategoryMaster;
	
	public int getTourId() {
		return tourId;
	}
	public void setTourId(int tourId) {
		this.tourId = tourId;
	}
	public String getPlace() {
		return place;
	}
	public void setPlace(String place) {
		this.place = place;
	}
	public String getTourName() {
		return tourName;
	}
	public void setTourName(String tourName) {
		this.tourName = tourName;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public String getDurationDays() {
		return durationDays;
	}
	public void setDurationDays(String durationDays) {
		this.durationDays = durationDays;
	}
	public String getDurationNights() {
		return durationNights;
	}
	public void setDurationNights(String durationNights) {
		this.durationNights = durationNights;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public LocalDate getStartDate() {
		return startDate;
	}
	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}
	public LocalDate getEndDate() {
		return endDate;
	}
	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}
	public int getSubcategoryMaster() {
		return subcategoryMaster;
	}
	public void setSubcategoryMaster(int subcategoryMaster) {
		this.subcategoryMaster = subcategoryMaster;
	}
	
	
	
}
