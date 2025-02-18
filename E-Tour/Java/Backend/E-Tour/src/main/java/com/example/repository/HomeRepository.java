package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.models.CategoryMaster;

@Repository
public interface HomeRepository extends JpaRepository<CategoryMaster,Integer>{
	
}
