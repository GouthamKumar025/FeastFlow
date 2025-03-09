package com.event_rsvp.event_backend.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EventDTO {
    private Long eventId;
    private String date;
    private String eventName;
    private String eventLocation;
    private String venue;
    private String time;
    private String guestDetails;
    private String mapLink;

    public EventDTO(Long eventId, String date, String eventName, String eventLocation, String venue, String time, String guestDetails, String mapLink) {
        this.eventId = eventId;
        this.date = date;
        this.eventName = eventName;
        this.eventLocation = eventLocation;
        this.venue = venue;
        this.time = time;
        this.guestDetails = guestDetails;
        this.mapLink = mapLink;
    }
}
