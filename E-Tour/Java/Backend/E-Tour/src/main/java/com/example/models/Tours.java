package com.example.models;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
public class Tours {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="tourid")
	private int tourId;

	private String place;
	
	@Column(name="tourname")
	private String tourName;
	@Column(name = "imageurl")
	private String imageUrl;
	@Column(name = "durationDays",nullable = false)
	private String durationDays;
	@Column(nullable = false)
	private String durationNights;

	@OneToMany(mappedBy = "tours", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ItenaryMaster> itenaries = new ArrayList<>();
	

	@ManyToOne(fetch = FetchType.EAGER)
	 @JoinColumn(name = "subcategoryMaster", referencedColumnName = "subCatMasterId", nullable = false)
	private SubcategoryMaster subcategoryMaster;

	public int getTourId() {
		return tourId;
	}

	public void setTourId(int tourId) {
		this.tourId = tourId;
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
	
	public SubcategoryMaster getSubcategoryMaster() {
		return subcategoryMaster;
	}

	public void setSubcategoryMaster(SubcategoryMaster subcategoryMaster) {
		this.subcategoryMaster = subcategoryMaster;
	}
	public List<ItenaryMaster> getItenaries() {
		return itenaries;
	}

	public void setItenaries(List<ItenaryMaster> itenaries) {
		this.itenaries = itenaries;
	}
    public String getPlace() {
		return place;
	}

	public void setPlace(String place) {
		this.place = place;
	}

}
