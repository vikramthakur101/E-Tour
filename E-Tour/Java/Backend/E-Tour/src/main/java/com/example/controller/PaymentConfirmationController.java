package com.example.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.BookingHeader;
import com.example.services.IPaymentConfirmationService;
import com.example.services.InvoicePdfService;

@RestController
@RequestMapping("/api/subcategory/tours/Booking/BookingConfirmation")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentConfirmationController {
	
	@Autowired
	IPaymentConfirmationService PaymentConfirmationService; 
	
	@Autowired 
	private InvoicePdfService invoicePdfService;

	@PostMapping("/save")
	public ResponseEntity<Map<String, String>> confirmBooking(@RequestBody BookingHeader bookingheader) {
	    Map<String, String> response = new HashMap<>();
	    try {
	    	
	    	invoicePdfService.invoicePdf(bookingheader);
	        System.out.println("Received booking data: " + bookingheader);
	        System.out.println("tourAmount: " + bookingheader.getTourAmount());
	        System.out.println("totalAmount: " + bookingheader.getTotalAmount());
	        System.out.println("customername: " + bookingheader.getCustomername());
	        System.out.println("tourName: " + bookingheader.getTourname());

	        PaymentConfirmationService.createBooking(bookingheader);
	        System.out.println("Inside payment");
	        response.put("message", "Booking created successfully!");
	        return ResponseEntity.status(HttpStatus.CREATED).body(response);
	    } catch (Exception e) {
	        e.printStackTrace(); // Log the full exception stack trace
	        response.put("message", "Error creating booking: " + e.getMessage());
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	    }
	}

}
