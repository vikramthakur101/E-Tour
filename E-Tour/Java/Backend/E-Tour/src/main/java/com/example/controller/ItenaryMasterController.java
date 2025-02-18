package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.example.DTO.ItenaryResponse;
import com.example.models.ItenaryMaster;
import com.example.services.DepartureDateService;
import com.example.services.InvoicePdfService;
import com.example.services.ItenaryMasterServiceImpl;

@RestController
@RequestMapping("/api/subcategory")
@CrossOrigin(origins = "http://localhost:3000")
public class ItenaryMasterController {

    @Autowired
    private ItenaryMasterServiceImpl itenaryMasterService;
    
    @Autowired
    private  DepartureDateService departureService; 

    
//    // Get ItenaryMaster by ID
//    @GetMapping("/{categoryId}/tours/{tourid}/itenary")
//    public ResponseEntity<List<ItenaryMaster>> getItenaryMasterById(@PathVariable("tourid") int tourId) {
//        return ResponseEntity.ok(itenaryMasterService.getItenaryMasterById(tourId));
//    }
//    
 
    @GetMapping("/{categoryId}/tours/{tourid}/departures")
    public ResponseEntity<List<String>> getDepartureDatesByTourId(@PathVariable("tourid") int tourId) {
        return ResponseEntity.ok(departureService.getDepartureDatesById(tourId)); // ✅ Corrected method name
    }
    
 // Get ItenaryMaster by ID
 // Get ItenaryMaster by ID with language support
    @GetMapping("/{categoryId}/tours/{tourid}/itenary")
    public ResponseEntity<List<ItenaryResponse>> getItenaryMasterById(
            @PathVariable("tourid") int tourId, 
            @RequestParam(name = "lang", required = false) String lang) 
    {
        try {
            // Fetch itinerary details from the service
            List<ItenaryResponse> details = itenaryMasterService.getItenaryDetailsByLanguage(tourId, lang);

            // Return details or appropriate error response
            if (details != null && !details.isEmpty()) {
                return ResponseEntity.ok(details);
            } else {
                return ResponseEntity.status(404).build();
            }
        } 
        catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    

}