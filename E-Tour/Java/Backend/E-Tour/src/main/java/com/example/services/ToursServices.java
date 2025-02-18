package com.example.services;

import java.time.LocalDate;
import java.util.List;

import com.example.DTO.ToursDTO;

public interface ToursServices {
	
	 List<ToursDTO> getToursBySubcategoryId(Integer ToursId);
//	 List<ToursDTO> searchTours(String name,LocalDate startDate,LocalDate endDate);
}
