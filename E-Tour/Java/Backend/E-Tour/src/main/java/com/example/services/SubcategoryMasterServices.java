package com.example.services;

import java.util.List;
import java.util.Optional;

import com.example.models.SubcategoryMaster;

public interface SubcategoryMasterServices {
      
	List<SubcategoryMaster> getAllSubcategory(Integer CategoryId);
	
}
