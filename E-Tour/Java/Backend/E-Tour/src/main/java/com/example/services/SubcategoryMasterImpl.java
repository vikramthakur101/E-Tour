package com.example.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.models.SubcategoryMaster;
import com.example.repository.SubcategoryMasterRepository;
 @Service
public class SubcategoryMasterImpl implements SubcategoryMasterServices {


	@Autowired
	private SubcategoryMasterRepository repository ;
	@Override
	public List<SubcategoryMaster> getAllSubcategory(Integer CategoryId) {
		return repository.findByCategoryId(CategoryId); 
			
	}

	
}
