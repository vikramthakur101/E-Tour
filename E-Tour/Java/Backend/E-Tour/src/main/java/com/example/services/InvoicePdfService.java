package com.example.services;

import java.io.IOException;

import com.example.models.BookingHeader;

public interface InvoicePdfService {
	public void invoicePdf(BookingHeader bookingheader) throws IOException;
}
