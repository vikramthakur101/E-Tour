package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.models.CostMaster;

@Repository
public interface BookingRepository extends JpaRepository<CostMaster, Integer>{

	@Query("Select c from CostMaster c where c.tour.tourId=:tourId")
	CostMaster findByTourId(@Param("tourId") Integer tourId);

}
