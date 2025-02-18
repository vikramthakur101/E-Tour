package com.example.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class OtpServices {

    @Autowired
    private JavaMailSender emailSender;

    // Store OTP and timestamp for expiration
    private final Map<String, OtpData> otpStorage = new HashMap<>();
    private final Map<String, Integer> otpAttempts = new HashMap<>();

    // OTP expiration time in milliseconds (e.g., 5 minutes)
    private static final long OTP_EXPIRATION_TIME = 5 * 60 * 1000;

    // Class to store OTP and timestamp
    private static class OtpData {
        private final String otp;
        private final long timestamp;

        public OtpData(String otp, long timestamp) {
            this.otp = otp;
            this.timestamp = timestamp;
        }

        public String getOtp() {
            return otp;
        }

        public long getTimestamp() {
            return timestamp;
        }
    }

    // Generate OTP
    public String generateOtp(String email) {
        String otp = String.format("%06d", new Random().nextInt(999999)); // Generates a 6-digit OTP

        // Store OTP and current timestamp
        otpStorage.put(email, new OtpData(otp, System.currentTimeMillis()));
        otpAttempts.put(email, 0); // Reset attempts for new OTP

        sendOtpEmail(email, otp);

        return otp;
    }

    // Send OTP to email
    private void sendOtpEmail(String email, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("incognitodoctor21@gmail.com");
        message.setTo(email);
        message.setSubject("Your OTP Code");
        message.setText("Your OTP is: " + otp);

        emailSender.send(message);
    }

    // Verify OTP
    public boolean verifyOtp(String email, String otpEntered) {
        // Check if OTP exists for the email
        if (!otpStorage.containsKey(email)) {
            return false;
        }

        OtpData otpData = otpStorage.get(email);

        // Check if OTP is expired
        if (System.currentTimeMillis() - otpData.getTimestamp() > OTP_EXPIRATION_TIME) {
            otpStorage.remove(email);
            otpAttempts.remove(email);
            return false;
        }

        // Check if OTP matches
        if (otpData.getOtp().equals(otpEntered)) {
            otpStorage.remove(email); // Remove OTP after successful verification
            otpAttempts.remove(email); // Reset the attempts after successful OTP verification
            return true;
        } else {
            // Increment retry count
            int attempts = otpAttempts.getOrDefault(email, 0);
            attempts++;
            otpAttempts.put(email, attempts);

            // Remove OTP after 3 failed attempts
            if (attempts >= 3) {
                otpStorage.remove(email);
                otpAttempts.remove(email);
            }
            return false;
        }
    }
}
