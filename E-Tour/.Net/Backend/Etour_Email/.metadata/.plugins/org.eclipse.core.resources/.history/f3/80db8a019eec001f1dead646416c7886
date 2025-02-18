package com.example.controllers;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.example.services.EmailService;
//
//@RestController
//public class EmailController 
//{
//	@Autowired
//	private EmailService service;
//	
//	@PostMapping("/email")
//	public void sendEmail(@RequestParam("subject")String subject,@RequestParam("file")MultipartFile filename,@RequestParam("message")String message)
//	{
//		service.sendEmail(subject, filename, message);
//	}
//}

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.services.*;

import java.util.Map;

@RestController
@RequestMapping("/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<String> sendEmail(@RequestBody Map<String, Object> emailData) {
        try {
            String recipient = (String) emailData.get("recipient");
            String subject = (String) emailData.get("subject");

            emailService.sendEmail(recipient, subject, emailData);

            return ResponseEntity.ok("Email Sent Successfully!");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error sending email: " + e.getMessage());
        }
    }
}
