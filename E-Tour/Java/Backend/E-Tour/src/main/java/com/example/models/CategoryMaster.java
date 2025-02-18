package com.example.models;

import jakarta.persistence.*;

@Entity
public class CategoryMaster {
	public CategoryMaster() {}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="categoryid")
	private int catMasterId;
	
	@Column(name="subcategoryid",nullable=false)
	private int SubCat_Id;
	@Column(nullable=false,length=100)
	private String Category_Name;
	@Column(nullable=false,length=255)
	private String categoryImagePath;
	@Column(nullable=false)
	private Boolean Flag;
	
	public int getCatMasterid() {
		return catMasterId;
	}
	public void setCatMasterid(int CatMaster_id) {
		catMasterId = CatMaster_id;
	}
	public int getSubCat_Id() {
		return SubCat_Id;
	}
	public void setSubCat_Id(int subCat_Id) {
		SubCat_Id = subCat_Id;
	}
	public String getCategory_Name() {	
		return Category_Name;
	}
	public void setCategory_Name(String category_Name) {
		Category_Name = category_Name;
	}
	public String getcategoryImagePath() {
		return categoryImagePath;
	}
	public void setcategoryImagePath(String categoryImagePath) {
		this.categoryImagePath = categoryImagePath;
	}
	public Boolean getFlag() {
		return Flag;
	}
	public void setFlag(Boolean flag) {
		Flag = flag;
	}

	
}
