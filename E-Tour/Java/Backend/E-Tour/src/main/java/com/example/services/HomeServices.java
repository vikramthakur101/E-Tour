package com.example.services;

import java.util.List;

import com.example.models.CategoryMaster;
import com.example.models.ItenaryMaster;

public interface HomeServices {
	List<CategoryMaster> getAllCategories();
	List<ItenaryMaster> getAllIternaries(int tourId);
}
