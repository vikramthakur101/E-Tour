package com.example.controller;

import com.example.models.Customer;
import com.example.services.CustomerServices;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:3000") 
public class CustomerController {

    @Autowired
    private CustomerServices customerServices;

    // Register new customer
    @PostMapping("/register")
    public ResponseEntity<?> registerCustomer(@RequestBody Customer customer) {
        Customer savedCustomer = customerServices.saveCustomer(customer);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCustomer);
    }

//    // Get customer by ID
//    @GetMapping("/{id}")
//    public Optional<Customer> getCustomerById(@PathVariable Long id) {
//        return customerServices.getCustomerById(id);
//    }
    // Get customer details by email after login
    @GetMapping("/check/{email}")
    public ResponseEntity<Customer> getCustomerDetails(@PathVariable String email) {
        try {
            Customer customer = customerServices.getCustomerByEmail(email);
            System.out.println("Inside check");
            if (customer != null) {
            	System.out.println("Inside not null");
            	System.out.println("customer"+customer.getFirstName());
                return ResponseEntity.ok(customer);
            } else {
            	System.out.println("Inside null");
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get customer by email for login
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginCustomer(@RequestBody Customer customer) {
        System.out.println(customer);
        Customer found = customerServices.getCustomerByEmailandPassword(customer);

        if (found!=null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Login Successful");
            return ResponseEntity.ok(response);
        }

        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("message", "Invalid email or password.");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    }

}