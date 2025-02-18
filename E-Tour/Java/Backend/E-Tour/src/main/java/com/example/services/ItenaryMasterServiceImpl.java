package com.example.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

import com.example.DTO.ItenaryResponse;
import com.example.models.ItenaryMaster;
import com.example.repository.ItenaryMasterRepository;

@Service
public class ItenaryMasterServiceImpl implements IternaryServices {

    @Autowired
    private ItenaryMasterRepository itenaryMasterRepository;

    // Get all itineraries by tour ID
    @Override
    public List<ItenaryMaster> getItenaryMasterById(int tourId) {
        return itenaryMasterRepository.findByTourId(tourId);
    }

    // Get itinerary details in the requested language
    @Override
    public List<ItenaryResponse> getItenaryDetailsByLanguage(int tourId, String lang) {
        List<ItenaryMaster> itenaryMasters = getItenaryMasterById(tourId);
        if (itenaryMasters.isEmpty()) {
            return null; // No itineraries found for the given tour ID
        }

        List<ItenaryResponse> responses = new ArrayList<>();
        String language = (lang != null) ? lang.toLowerCase() : "en";

        for (ItenaryMaster itenary : itenaryMasters) {
            String details;
            switch (language) {
                case "fr":
                    details = itenary.getDetailsFr();
                    break;
                case "es":
                    details = itenary.getDetailsEs();
                    break;
                case "mr":
                    details = itenary.getDetailsMr();
                    break;
                case "hi":
                    details = itenary.getDetailsHi();
                    break;
                default:
                    details = itenary.getDescription(); // Default to English
                    break;
            }

            // Create ItenaryResponse object
            ItenaryResponse response = new ItenaryResponse(
                details,  // Itinerary details based on language
                itenary.getImages(), // Get image URL from the database
                itenary.getDayNo(), // Get day number from the database
                details // Same as itinerary details
            );

            responses.add(response);
        }

        return responses; // Return the list of ItenaryResponse
    }
}
