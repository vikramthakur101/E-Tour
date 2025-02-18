/*
 * This class is for more informative response when no tours are found, 
 * we can create a custom response object that holds both a status and a message along with the list of tours. 
 * */

package com.example.models;

import java.util.List;

import com.example.DTO.ToursDTO;

public class ApiResponse {
    private List<ToursDTO> tours;
    private String message;

    public ApiResponse(List<ToursDTO> tours, String message) {
        this.tours = tours;
        this.message = message;
    }

    // Getters and setters
    public List<ToursDTO> getTours() {
        return tours;
    }

    public void setTours(List<ToursDTO> tours) {
        this.tours = tours;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}