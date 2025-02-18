package com.example.services;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.repository.DepartureDateRepository;

@Service
public class DepartureDateService {

    @Autowired
    private DepartureDateRepository departureDateRepository;

    public List<String> getDepartureDatesById(int tourId) {
        List<Object[]> departures = departureDateRepository.findStartAndEndDatesByTourId(tourId);
        
        return departures.stream()
                         .map(d -> ((Date) d[0]).toString() + " - " + ((Date) d[1]).toString()) // Convert start and end date
                         .collect(Collectors.toList());
    }
}
