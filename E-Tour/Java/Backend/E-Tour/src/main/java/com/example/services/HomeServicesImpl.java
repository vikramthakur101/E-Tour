package com.example.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.models.CategoryMaster;
import com.example.models.ItenaryMaster;
import com.example.repository.HomeRepository;
import com.example.repository.ItenaryMasterRepository;

@Service
public class HomeServicesImpl implements HomeServices{
	@Autowired
	private HomeRepository homerepository;
	
	@Autowired
	private ItenaryMasterRepository itenaryrepository;

	@Override
	public List<CategoryMaster> getAllCategories() {
		// TODO Auto-generated method stub
		return homerepository.findAll();
	}

	@Override
	public List<ItenaryMaster> getAllIternaries(int tourId) {
		return itenaryrepository.findByTourId(tourId);  // Return the fetched itineraries
	}
	
}
