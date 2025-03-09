package com.event_rsvp.event_backend.Services;


import com.event_rsvp.event_backend.DTO.GuestDTO;
import com.event_rsvp.event_backend.model.Event;

import java.util.List;

public interface EventService {
    Event createEvent(Event event);

    Event getEventById(long userId);

    List<Event> getEventsByUserId(String userId);

    List<GuestDTO> getGuestByEventId(long eventId);


}
