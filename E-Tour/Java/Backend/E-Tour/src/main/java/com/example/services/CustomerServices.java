package com.example.services;

import com.example.models.Customer;

public interface CustomerServices {
	Customer saveCustomer(Customer customer);
	//Optional<Customer> getCustomerById(Long customerId);
	Customer getCustomerByEmailandPassword(Customer customer);
	
	Customer getCustomerByEmail(String email);
}