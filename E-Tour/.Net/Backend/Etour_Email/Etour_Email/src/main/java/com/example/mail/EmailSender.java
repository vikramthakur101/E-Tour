package com.example.mail;
import java.io.FileOutputStream;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Properties;
import jakarta.mail.Session;
import jakarta.mail.Session;
import jakarta.mail.Message;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Transport;
import jakarta.mail.Authenticator;
import jakarta.mail.Multipart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.InternetAddress;
import jakarta.activation.DataHandler;
import jakarta.activation.DataSource;
import jakarta.activation.FileDataSource;
import jakarta.mail.*;
import jakarta.mail.internet.*;
import jakarta.activation.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import com.itextpdf.html2pdf.HtmlConverter;
import java.util.Properties;
import jakarta.mail.Session;
import jakarta.mail.Message;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Transport;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMultipart;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.Multipart;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class EmailSender {

    @Value("${file.path}")
    private String path;

    public void send(String subject, MultipartFile filename, String message) {
        final String username = "travelvista";
        final String password = "hyqiuocfwocsyagn";

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props,
          new jakarta.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
          });

        try {
            // Reading HTML invoice template
            String htmlContent = new String(Files.readAllBytes(Paths.get("D:\\mail\\Etour_Email\\Etour_Email\\src\\main\\resources\\booking-confirmation.html")));

            // Creating a MIME email
            MimeMessage emailMessage = new MimeMessage(session);
            emailMessage.setRecipients(Message.RecipientType.TO, InternetAddress.parse("shrutidantala0603@gmail.com"));
            emailMessage.setSubject(subject);

            // Creating the email body part for HTML content
            MimeBodyPart htmlPart = new MimeBodyPart();
            htmlPart.setContent(htmlContent, "text/html"); // Set HTML content

            // Creating a text message part (optional)
            MimeBodyPart textPart = new MimeBodyPart();
            textPart.setText(message, "utf-8");

            // Combine body parts into a multipart email
            Multipart multipart = new MimeMultipart();
            multipart.addBodyPart(htmlPart);
            multipart.addBodyPart(textPart);

            // Set email content
            emailMessage.setContent(multipart);

            // Send email
            Transport.send(emailMessage);

            System.out.println("Email sent successfully with HTML invoice in body");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}


