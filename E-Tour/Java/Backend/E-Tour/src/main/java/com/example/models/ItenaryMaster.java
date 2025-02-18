package com.example.models;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
public class ItenaryMaster {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int ItenaryId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "tour_id", nullable = false, foreignKey = @ForeignKey(name = "FK_tour_itenary"))
	@JsonIgnore
	private Tours tours;
	
	private String images;
	
	@Column(nullable=false,length=1000)
	private String Description;
	
	@Column(nullable=false)
	private int dayNo;
	
	@Column(name="detailsFr",length=1000)
	private String detailsFr;
	
	@Column(name="detailsEs",length=1000)
    private String detailsEs;
	
	@Column(name="detailsMr",length=1000)
    private String detailsMr;
	
	@Column(name="detailsHi",length=1000)
    private String detailsHi;	
	
	public String getDetailsFr() {
		return detailsFr;
	}

	public void setDetailsFr(String detailsFr) {
		this.detailsFr = detailsFr;
	}

	public String getDetailsEs() {
		return detailsEs;
	}

	public void setDetailsEs(String detailsDe) {
		this.detailsEs = detailsDe;
	}

	public String getDetailsMr() {
		return detailsMr;
	}

	public void setDetailsMr(String detailsMr) {
		this.detailsMr = detailsMr;
	}

	public String getDetailsHi() {
		return detailsHi;
	}

	public void setDetailsHi(String detailsHi) {
		this.detailsHi = detailsHi;
	}
	
	public int getItenaryId() {
		return ItenaryId;
	}

	public void setItenaryId(int itenaryId) {
		ItenaryId = itenaryId;
	}

	public String getDescription() {
		return Description;
	}

	public void setDescription(String description) {
		Description = description;
	}

	public int getDayNo() {
		return dayNo;
	}

	public void setDayNo(int dayNo) {
		this.dayNo = dayNo;
	}

	public Tours getTours() {
		return tours;
	}

	public String getImages() {
		return images;
	}

	public void setImages(String images) {
		this.images = images;
	}

	public void setTours(Tours tours) {
		this.tours = tours;
	}


}