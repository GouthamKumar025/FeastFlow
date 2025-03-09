package com.event_rsvp.event_backend.Services;

import com.event_rsvp.event_backend.Entity.ContactEntity;
import com.event_rsvp.event_backend.Repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactServiceImp implements ContactService{

    @Autowired
    private ContactRepository contactRepository;

    @Override
    public ContactEntity submitContact(ContactEntity contact) {
        return contactRepository.save(contact);
    }
}
