package com.event_rsvp.event_backend.Services;

import com.event_rsvp.event_backend.Entity.ContactEntity;

public interface ContactService {
    ContactEntity submitContact(ContactEntity contact);
}
