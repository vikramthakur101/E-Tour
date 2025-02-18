package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.DTO.ItenaryResponse;
import com.example.models.CategoryMaster;
import com.example.models.ItenaryMaster;
import com.example.services.DepartureDateService;
import com.example.services.HomeServices;
import com.example.services.ItenaryMasterServiceImpl;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class HomeController {
	@Autowired 
	private HomeServices homeservices;
	
	@Autowired
    private ItenaryMasterServiceImpl itenaryMasterService;

	@Autowired
    private  DepartureDateService departureService; 

	
	@GetMapping("")
	public List<CategoryMaster> getAllCategories()
	{
		return homeservices.getAllCategories();
	}
	
	//for mockito
		public HomeController(HomeServices hservice) {
			super();
			this.homeservices=hservice;
		}
	
		
		
		 @GetMapping("/tours/{tourid}/departures")
		    public ResponseEntity<List<String>> getDepartureDatesByTourId(@PathVariable("tourid") int tourId) {
		        return ResponseEntity.ok(departureService.getDepartureDatesById(tourId)); // ✅ Corrected method name
		    }
		 
		 @GetMapping("/tour/{tourid}/itenary")
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

