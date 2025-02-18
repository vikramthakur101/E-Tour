package com.example.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;


import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Map;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Override
    public void sendEmail(String recipient, String subject, Map<String, Object> templateModel) throws MessagingException {
        // Prepare Thymeleaf context
        Context context = new Context();
        context.setVariables(templateModel);

        // Process Thymeleaf template to get HTML content
        String htmlContent = templateEngine.process("booking-confirmation", context);
        
        // Generate PDF
        File pdfFile = generatePdfFromHtml(htmlContent);

        // Create email message
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(recipient);
        helper.setSubject(subject);
        helper.setText("Please find your booking confirmation attached.", true);
        helper.addAttachment("booking-confirmation.pdf", pdfFile);

        // Send email
        mailSender.send(message);
        System.out.println("Email sent to " + recipient);
    }

    private File generatePdfFromHtml(String htmlContent) {
        if (htmlContent == null || htmlContent.isEmpty()) {
            throw new IllegalArgumentException("HTML content for PDF generation is empty.");
        }

        File pdfFile = null;
        try {
            pdfFile = File.createTempFile("booking-confirmation", ".pdf");
            try (OutputStream os = new FileOutputStream(pdfFile)) {
                PdfRendererBuilder builder = new PdfRendererBuilder();
                builder.useFastMode();
                builder.withHtmlContent(htmlContent, null);
                builder.toStream(os);
                builder.run();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return pdfFile;
    }
}
