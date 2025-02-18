package com.example.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.DTO.CostMasterDTO;
import com.example.models.CostMaster;
import com.example.repository.BookingRepository;

@Service
public class BookingServicesImpl implements IBookingServices {
	
	@Autowired
	BookingRepository bookingrepository;

	//Get the Cost of the Tour by TourId
	@Override
	public CostMasterDTO getCostByTourId(Integer tourId) {
		CostMaster costMaster = bookingrepository.findByTourId(tourId);
		if(costMaster==null)
		{
			return null;
		}
		
		// Manually map CostMaster to CostMasterDTO
        return new CostMasterDTO(
            costMaster.getCostId(),
            costMaster.getTwinSharingCost(),
            costMaster.getExtraPersonCost(),
            costMaster.getChildWithBed(),
            costMaster.getChildWithoutBed(),
            costMaster.getSinglePersonCost()
        );
		
	}
}
