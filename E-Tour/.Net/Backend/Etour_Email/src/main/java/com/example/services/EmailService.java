package com.example.services;

import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import jakarta.mail.MessagingException;

public interface EmailService {
    void sendEmail(String recipient, String subject, Map<String, Object> templateModel) throws MessagingException;
}