package com.example.services;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.example.mail.EmailSender;
//
//@Service
//public class EmailServiceImpl implements EmailService 
//{
//	@Autowired
//	private EmailSender sender;
//
//	@Override
//	public void sendEmail(String subject,MultipartFile filename, String message) 
//	{
//		sender.send(subject,filename, message);
//	}
//
//}

//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.MimeMessageHelper;
//import org.springframework.stereotype.Service;
//
//import jakarta.mail.MessagingException;
//import jakarta.mail.internet.MimeMessage;
//
//@Service
//public class EmailServiceImpl {
//
//    @Autowired
//    private JavaMailSender mailSender;
//
//    public void sendEmail(String subject, String htmlContent) throws MessagingException {
//        String to = "shrutidantala0603@gmail.com"; // Hardcoded recipient email
//
//        MimeMessage message = mailSender.createMimeMessage();
//        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
//
//        helper.setTo(to);
//        helper.setSubject(subject);
//        helper.setText(htmlContent, true); // HTML content
//
//        mailSender.send(message);
//        System.out.println("Email sent to " + to);
//    }
//
//}
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.util.Map;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine; // Inject Thymeleaf template engine

    @Override
    public void sendEmail(String recipient, String subject, Map<String, Object> templateModel) throws MessagingException {
        // Prepare Thymeleaf context
        Context context = new Context();
        context.setVariables(templateModel);

        // Process Thymeleaf template to get HTML content
        String htmlContent = templateEngine.process("booking-confirmation", context);

        // Create the email message
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = null;
		try {
			helper = new MimeMessageHelper(message, true, "UTF-8");
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

        helper.setTo(recipient);
        helper.setSubject(subject);
        helper.setText(htmlContent, true); // true for HTML content

        // Send the email
        mailSender.send(message);
        System.out.println("Email sent to " + recipient);
    }
}
