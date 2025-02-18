package com.example.repository;

import com.example.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
//import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
	@Query("SELECT c FROM Customer c WHERE c.email = :email AND c.password = :password")
	Customer findByEmailAndPassword(@Param("email") String email, @Param("password") String password);
	Customer findByEmail(String email);
}