package com.example.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
public class SubcategoryMaster {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="subCatMasterId",nullable=false)
	private int subCatMasterId;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="catMasterId",nullable=false)
	@JsonIgnore
	private CategoryMaster categoryMaster;	//Reference to the CategoryMaster Table
	
	@Column(name ="subCatId",nullable = false, length = 3)
	private String subCatId;		//example->EUP,SEA,KSH
	
	@Column(name = "subCatName",nullable = false, length = 255)
	private String subCatName;
	
	@Column(name ="subCatImagePath",nullable = true, length = 255)
	private String subCatImagePath;
	
	@Column(nullable = false)
	private Boolean flag;
	
	public int getSubCatMasterId() {
		return subCatMasterId;
	}

	public void setSubCatMasterId(int subCatMasterId) {
		this.subCatMasterId = subCatMasterId;
	}

	public CategoryMaster getCategoryMaster() {
		return categoryMaster;
	}

	public void setCategoryMaster(CategoryMaster categoryMaster) {
		this.categoryMaster = categoryMaster;
	}

	public String getSubCatId() {
		return subCatId;
	}

	public void setSubCatId(String subCatId) {
		this.subCatId = subCatId;
	}

	public String getSubCatName() {
		return subCatName;
	}

	public void setSubCatName(String subCatName) {
		this.subCatName = subCatName;
	}

	public String getSubCatImagePath() {
		return subCatImagePath;
	}

	public void setSubCatImagePath(String subCatImagePath) {
		this.subCatImagePath = subCatImagePath;
	}

	public Boolean getFlag() {
		return flag;
	}

	public void setFlag(Boolean flag) {
		this.flag = flag;
	}
	
	public SubcategoryMaster() {}
	
	
}
