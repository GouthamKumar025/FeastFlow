package com.event_rsvp.event_backend.Controller;

import com.event_rsvp.event_backend.Entity.ContactEntity;
import com.event_rsvp.event_backend.Services.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/contacts")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @PostMapping("/submit")
    public ResponseEntity<ContactEntity> submitContact(@RequestBody ContactEntity contact){
        ContactEntity savedContact = contactService.submitContact(contact);
        return ResponseEntity.ok(savedContact);
    }

}
