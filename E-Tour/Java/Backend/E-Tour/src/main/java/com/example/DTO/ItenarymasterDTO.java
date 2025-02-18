package com.example.DTO;

import java.util.List;

public class ItenarymasterDTO {
    private List<String> details;

    public ItenarymasterDTO(List<String> details) {
        this.details = details;
    }

    public ItenarymasterDTO(int tourId, List<String> details2) {
		// TODO Auto-generated constructor stub
	}

	public ItenarymasterDTO(int tourId, String string) {
		// TODO Auto-generated constructor stub
	}

	public List<String> getDetails() {
        return details;
    }

    public void setDetails(List<String> details) {
        this.details = details;
    }
}
