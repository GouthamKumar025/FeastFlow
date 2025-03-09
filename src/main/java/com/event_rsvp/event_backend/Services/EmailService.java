package com.event_rsvp.event_backend.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendInvitation(String to, long eventId, long guestId){
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(to);
        simpleMailMessage.setSubject("Email Invitation");
        simpleMailMessage.setText("RSVP Link: http://localhost:5173/rsvp/" + eventId + "/" + guestId);


        mailSender.send(simpleMailMessage);
    }
}
