package com.example.services;

import com.example.models.Customer;
import com.example.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CustomerServiceImpl implements CustomerServices{

    @Autowired
    private CustomerRepository customerRepository;

    // Save or update a customer
    @Override
    public Customer saveCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

//    // Find a customer by ID
//    @Override
//    public Optional<Customer> getCustomerById(Long customerId) {
//        return customerRepository.findById(customerId);
//    }

	@Override
	public Customer getCustomerByEmailandPassword(Customer customer) {
		return customerRepository.findByEmailAndPassword(customer.getEmail(),customer.getPassword());
		
	}
	@Override
	public Customer getCustomerByEmail(String email) {
		return customerRepository.findByEmail(email);
	}
   
}