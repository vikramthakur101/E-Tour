package com.example.services;

import com.example.models.BookingHeader;

public interface IPaymentConfirmationService {

	void createBooking(BookingHeader bookingHeader);

}
