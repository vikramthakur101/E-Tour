package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.models.SubcategoryMaster;
import java.util.List;

public interface SubcategoryMasterRepository extends JpaRepository<SubcategoryMaster, Integer> {
	
	@Query("SELECT s FROM SubcategoryMaster s WHERE s.categoryMaster.catMasterId = :categoryId")
	List<SubcategoryMaster> findByCategoryId(@Param("categoryId") Integer categoryId);

}
