package com.example.services;


import java.util.List;

import com.example.DTO.ItenaryResponse;
import com.example.models.ItenaryMaster;
public interface IternaryServices {
	List<ItenaryMaster> getItenaryMasterById(int id);
	List<ItenaryResponse> getItenaryDetailsByLanguage(int tourId, String language);
}