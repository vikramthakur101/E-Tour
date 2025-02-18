package com.example.services;

import com.example.DTO.CostMasterDTO;

public interface IBookingServices {
	public CostMasterDTO getCostByTourId(Integer tourid);
}
