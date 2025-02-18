package com.example.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.example.models.DepartureDates;

@Repository
public interface DepartureDateRepository extends JpaRepository<DepartureDates, Integer> {

    @Query("SELECT d.startdate, d.enddate FROM DepartureDates d WHERE d.tour.tourId = :tourId")
    List<Object[]> findStartAndEndDatesByTourId(@Param("tourId") int tourId);
}
