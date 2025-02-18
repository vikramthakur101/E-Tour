package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.DTO.CostMasterDTO;
import com.example.services.IBookingServices;

@RestController
@RequestMapping("/api/subcategory/{categoryId}/tours/{tourId}/itenary/booking")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    private IBookingServices bookingServices;

    @GetMapping("/{tourid}")
    public ResponseEntity<?> getBookingCost(@PathVariable Integer tourid) {
        try {
            CostMasterDTO costMasterDTO = bookingServices.getCostByTourId(tourid);

            if (costMasterDTO != null) {
                return ResponseEntity.status(HttpStatus.OK).body(costMasterDTO);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No cost details found for the given tour ID.");
            }
        } catch (Exception e) {
        	e.printStackTrace(); 
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.");
        }
    }
}
