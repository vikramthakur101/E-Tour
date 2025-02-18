package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.models.ItenaryMaster;

public interface ItenaryMasterRepository extends JpaRepository<ItenaryMaster,Integer>{
	   // Custom query to fetch ItenaryMaster by tourId
    @Query( nativeQuery=true , value="SELECT * FROM itenarymaster WHERE tour_id = :tourId")
    List<ItenaryMaster> findByTourId(@Param("tourId") int tourId);
	

}
