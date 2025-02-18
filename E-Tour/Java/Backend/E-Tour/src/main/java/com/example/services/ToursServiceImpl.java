package com.example.services;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.DTO.ToursDTO;
import com.example.models.Tours;

import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import com.example.repository.*;


@Service
public class ToursServiceImpl implements ToursServices {

    @Autowired 
    private ToursRepository toursRepository;

    // Get all tours based on the SubcategoryId
    public List<ToursDTO> getToursBySubcategoryId(Integer subcategoryId) {
    	   List<Tours> tours = toursRepository.findBySubCategoryId(subcategoryId);
           return tours.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

//    //Get all tours based on the search
//	@Override
//	public List<ToursDTO> searchTours(String place, LocalDate startDate, LocalDate endDate) {
//		List<Tours> tours = toursRepository.searchTours(place, startDate, endDate);
//        return tours.stream().map(this::convertToDTO).collect(Collectors.toList());
//	}

	// Convert Tours entity to ToursDTO
    private ToursDTO convertToDTO(Tours tour) {
        ToursDTO dto = new ToursDTO();
        dto.setTourId(tour.getTourId());
        dto.setPlace(tour.getPlace());
        dto.setTourName(tour.getTourName());
        dto.setImageUrl(tour.getImageUrl());
        dto.setDurationDays(tour.getDurationDays());
        dto.setDurationNights(tour.getDurationNights());
        if (tour.getSubcategoryMaster() != null) {
            dto.setSubcategoryMaster(tour.getSubcategoryMaster().getSubCatMasterId()); // Assuming getSubCatMasterId() exists
        } else {
            dto.setSubcategoryMaster(0); // Default value if null
        }
        return dto;
    }
}
