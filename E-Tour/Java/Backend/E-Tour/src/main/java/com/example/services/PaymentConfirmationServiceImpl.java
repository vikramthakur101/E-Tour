package com.example.services;

import org.springframework.http.HttpHeaders;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.models.BookingHeader;
import com.example.models.BookingStatus;
import com.example.models.PaymentStatus;
import com.example.repository.PaymentConfirmationRepository;
@Service
public class PaymentConfirmationServiceImpl implements IPaymentConfirmationService {

    @Autowired
    PaymentConfirmationRepository paymConfirmationRepository;
    
    @Autowired
    private RestTemplate restTemplate; 

    final String emailServiceUrl = "http://localhost:8080/email"; // Email Service API

    // To save the Booking details after successful payment
    public void createBooking(BookingHeader bookingdetails) {
        // Creating a new BookingHeader object to save the details
        BookingHeader bookingHeader = new BookingHeader();

        // Setting values from bookingdetails (the incoming parameter)
        bookingHeader.setBookingDate(bookingdetails.getBookingDate()); 
        bookingHeader.setCustomerId(bookingdetails.getCustomerId());
        bookingHeader.setTourId(bookingdetails.getTourId());
        bookingHeader.setTourAmount(bookingdetails.getTourAmount()); 
        bookingHeader.setTotalAmount(bookingdetails.getTotalAmount()); 
        bookingHeader.setNumberOfPassengers(bookingdetails.getNumberOfPassengers()); 
        bookingHeader.setTourname(bookingdetails.getTourname()); 
        bookingHeader.setCustomername(bookingdetails.getCustomername());
        bookingHeader.setEmail(bookingdetails.getEmail());
        

        // Setting booking and payment status
        bookingHeader.setBookingStatus(BookingStatus.CONFIRMED); 
        bookingHeader.setPaymentStatus(PaymentStatus.COMPLETED); 
        
        // Generate and set transaction ID
        String transactionId = generateTransactionId();
        bookingHeader.setTransactionId(transactionId);

        // Save the booking to the database
        paymConfirmationRepository.save(bookingHeader);
        sendEmailNotification(bookingdetails);
    }
    
    private void sendEmailNotification(BookingHeader bookingHeader) {
        try {
            // Prepare Email Payload
            Map<String, Object> emailRequest = new HashMap<>();
            emailRequest.put("recipient", "bookingHeader.getEmail"); 
            emailRequest.put("subject", "Booking Confirmation: " + bookingHeader.getTourname());
            emailRequest.put("customerName", bookingHeader.getCustomername());
            emailRequest.put("tourName", bookingHeader.getTourname());
            emailRequest.put("bookingDate", bookingHeader.getBookingDate());
            emailRequest.put("totalAmount", bookingHeader.getTotalAmount());
            emailRequest.put("CustomerId", bookingHeader.getCustomerId());
            emailRequest.put("tourId", bookingHeader.getTourId());
            emailRequest.put("tourAmount", bookingHeader.getTourAmount());
            emailRequest.put("numberOfPassangers", bookingHeader.getNumberOfPassengers());
            emailRequest.put("transactionId", bookingHeader.getTransactionId());



            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(emailRequest, headers);

            // Call Email Service API
            ResponseEntity<String> response = restTemplate.exchange(
                    emailServiceUrl + "/send", HttpMethod.POST, requestEntity, String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                System.out.println("Email sent successfully.");
            } else {
                System.out.println("Failed to send email: " + response.getStatusCode());
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Error while sending email: " + e.getMessage());
        }
    }


    // Method to generate random transaction ID
    private String generateTransactionId() {
        return "TCN-" + System.currentTimeMillis() + "-" + (int) (Math.random() * 10000);
    }
}