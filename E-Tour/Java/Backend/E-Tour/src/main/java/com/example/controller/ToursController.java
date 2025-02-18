package com.example.controller;

import com.example.DTO.ToursDTO;
import com.example.models.ApiResponse;
import com.example.services.ToursServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/subcategory")
@CrossOrigin(origins = "http://localhost:3000")
public class ToursController {

    @Autowired
    private ToursServices toursService;

    // Get all tours
    @GetMapping("/{subcategoryId}/tours")
    public ResponseEntity<List<ToursDTO>> getAllTours(@PathVariable Integer subcategoryId) {
        try {
            List<ToursDTO> tours = toursService.getToursBySubcategoryId(subcategoryId);
            if(tours.isEmpty())
            {
            	return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
            }
            System.out.println(tours);
            return ResponseEntity.ok(tours);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    
//    @GetMapping("/tours/search")
//    public ResponseEntity<ApiResponse> searchTours(@RequestParam(required = false) String place, 
//                                                    @RequestParam(required = false) LocalDate startDate, 
//                                                    @RequestParam(required = false) LocalDate endDate) {
//        try {
//            List<ToursDTO> tours = toursService.searchTours(place, startDate, endDate);
//            if (tours.isEmpty()) {
//                ApiResponse response = new ApiResponse(tours, "No tours found matching the criteria");
//                return ResponseEntity.ok(response);  // Return 200 OK with empty list and message
//            }
//            ApiResponse response = new ApiResponse(tours, "Tours found");
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }




}
