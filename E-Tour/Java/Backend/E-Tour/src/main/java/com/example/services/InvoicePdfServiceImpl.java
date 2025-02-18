package com.example.services;

import org.springframework.stereotype.Service;

import com.example.models.BookingHeader;
import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;

import com.itextpdf.layout.element.*;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import java.io.File;
import java.io.IOException;
import java.time.format.DateTimeFormatter;

@Service
public class InvoicePdfServiceImpl implements InvoicePdfService  {

	@Override
	public void invoicePdf(BookingHeader booking) throws IOException {
		// TODO Auto-generated method stub
		String pdfName = "Invoice_" + booking.getCustomerId() ;  
	    String path = pdfName + ".pdf";

	    PdfWriter pdfWriter = new PdfWriter(new File(path));
	    PdfDocument pdfDocument = new PdfDocument(pdfWriter);
	    pdfDocument.setDefaultPageSize(PageSize.A4);
	    Document document = new Document(pdfDocument);

	    PdfFont boldFont = PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLD);
	    PdfFont regularFont = PdfFontFactory.createFont(StandardFonts.HELVETICA);

	    Paragraph header = new Paragraph("TOURVISTA INVOICE")
	            .setFontSize(26)
	            .setFont(boldFont)
	            .setFontColor(ColorConstants.BLUE)
	            .setTextAlignment(TextAlignment.CENTER)
	            .setMarginBottom(20);
	    document.add(header);

	    Table detailsTable = new Table(new float[]{1, 1});
	    detailsTable.setWidth(UnitValue.createPercentValue(100));

	    detailsTable.addCell(new Cell().add(new Paragraph("TourVista\n123 Travel Street\nMumbai, India\n📞 +91-9876543210\n🌐 www.tourvista.com"))
	            .setFont(regularFont)
	            .setBorder(Border.NO_BORDER));

	    String customerName = booking.getCustomername() != null ? booking.getCustomername() : "N/A";
	    //String email = booking.getEmail() != null ? booking.getEmail() : "N/A";
	    String bookingDate = booking.getBookingDate() != null ? booking.getBookingDate().format(DateTimeFormatter.ofPattern("dd-MM-yyyy")) : "N/A";

	    detailsTable.addCell(new Cell().add(new Paragraph("Billed To:\n" + customerName + "\n📅 Booking Date: " + bookingDate))
	            .setFont(regularFont)
	            .setBorder(Border.NO_BORDER)
	            .setTextAlignment(TextAlignment.RIGHT));

	    document.add(detailsTable);
	    document.add(new Paragraph("\n"));

	    Table table = new Table(new float[]{2, 1, 1, 1});
	    table.setWidth(UnitValue.createPercentValue(100));

	    String[] headers = {"Tour Package", "Passengers", "Base Price (₹)", "Total Price (₹)"};
	    for (String headerText : headers) {
	        table.addHeaderCell(new Cell().add(new Paragraph(headerText))
	                .setBackgroundColor(ColorConstants.LIGHT_GRAY)
	                .setFont(boldFont)
	                .setTextAlignment(TextAlignment.CENTER));
	    }

	    String tourName = booking.getTourname() != null ? booking.getTourname() : "N/A";
	    String passengerCount = String.valueOf(booking.getNumberOfPassengers());
	    String basePrice = formatCurrency(booking.getTourAmount());
	    String totalPrice = formatCurrency(booking.getTotalAmount());

	    table.addCell(new Cell().add(new Paragraph(tourName)).setFont(regularFont).setTextAlignment(TextAlignment.LEFT));
	    table.addCell(new Cell().add(new Paragraph(passengerCount)).setFont(regularFont).setTextAlignment(TextAlignment.CENTER));
	    table.addCell(new Cell().add(new Paragraph(basePrice)).setFont(regularFont).setTextAlignment(TextAlignment.RIGHT));
	    table.addCell(new Cell().add(new Paragraph(totalPrice)).setFont(regularFont).setTextAlignment(TextAlignment.RIGHT));

	    document.add(table);
	    document.add(new Paragraph("\n"));

	    Table totalTable = new Table(new float[]{3, 1});
	    totalTable.setWidth(UnitValue.createPercentValue(100));

	    String taxAmount = formatCurrency(booking.getTourAmount() * 0.05);

	    totalTable.addCell(new Cell().add(new Paragraph("Subtotal:")).setFont(regularFont).setBorder(Border.NO_BORDER));
	    totalTable.addCell(new Cell().add(new Paragraph(basePrice)).setFont(regularFont).setTextAlignment(TextAlignment.RIGHT).setBorder(Border.NO_BORDER));

	    totalTable.addCell(new Cell().add(new Paragraph("Tax (5%):")).setFont(regularFont).setBorder(Border.NO_BORDER));
	    totalTable.addCell(new Cell().add(new Paragraph(taxAmount)).setFont(regularFont).setTextAlignment(TextAlignment.RIGHT).setBorder(Border.NO_BORDER));

	    totalTable.addCell(new Cell().add(new Paragraph("Total Amount:")).setFont(boldFont).setBorder(Border.NO_BORDER));
	    totalTable.addCell(new Cell().add(new Paragraph(totalPrice)).setFont(boldFont).setTextAlignment(TextAlignment.RIGHT).setBorder(Border.NO_BORDER).setFontColor(ColorConstants.RED));

	    document.add(totalTable);

	    document.add(new Paragraph("\nThank you for choosing TourVista! 🌍\nYour gateway to amazing experiences.\nwww.tourvista.com")
	            .setTextAlignment(TextAlignment.CENTER)
	            .setFontSize(12)
	            .setFont(regularFont)
	            .setFontColor(ColorConstants.GRAY)
	            .setMarginTop(20));

	    document.close();
	    System.out.println("✅ Invoice PDF Created: " + path);
		
	}
	private String formatCurrency(Double value) {
	    return value != null ? String.format("₹%.2f", value) : "₹0.00";
	}

}
