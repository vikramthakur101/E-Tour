package com.example.repository;

import com.example.models.Tours;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ToursRepository extends JpaRepository<Tours, Integer> {

	@Query("SELECT t FROM Tours t WHERE t.subcategoryMaster.subCatMasterId = :subcategoryId")
	List<Tours> findBySubCategoryId(@Param("subcategoryId") Integer subcategoryId);

//	@Query("SELECT t FROM Tours t WHERE " +
//		       "(:place IS NULL OR t.place LIKE %:place%) AND " +
//		       "(:startDate IS NULL OR t.startDate >= :startDate) AND " +
//		       "(:endDate IS NULL OR t.endDate <= :endDate)")
//		List<Tours> searchTours(@Param("place") String place, 
//		                        @Param("startDate") LocalDate startDate, 
//		                        @Param("endDate") LocalDate endDate);

}
