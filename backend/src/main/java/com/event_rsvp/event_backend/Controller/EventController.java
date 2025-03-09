package com.event_rsvp.event_backend.Controller;

import com.corundumstudio.socketio.SocketIOServer;
import com.event_rsvp.event_backend.DTO.GuestDTO;
import com.event_rsvp.event_backend.Repository.GuestRepository;
import com.event_rsvp.event_backend.Services.EventService;
import com.event_rsvp.event_backend.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(
        origins = "http://localhost:5173",
        allowedHeaders = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS}
)
@RestController
@RequestMapping("/events")
public class EventController {

    private final EventService eventService;

    private final GuestRepository guestRepository;

    @Autowired
    private SocketIOServer socketIOServer;

    public EventController(EventService eventService, GuestRepository guestRepository) {
        this.eventService = eventService;
        this.guestRepository = guestRepository;
    }

    // EventController.java
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Event>> getEventsByUser(@PathVariable String userId) {
        List<Event> events = eventService.getEventsByUserId(userId);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/{eventId}/eventdetails")
    public ResponseEntity<Event> getEventById(@PathVariable long eventId) { // Use eventId, not userId
        Event event = eventService.getEventById(eventId); // Fetch by eventId
        return ResponseEntity.ok(event);
    }

    @GetMapping("/guestrsvp/{eventId}")
    public ResponseEntity<List<GuestDTO>>getGuestByEventId(@PathVariable long eventId){
        List<GuestDTO> guests = eventService.getGuestByEventId(eventId);
        return ResponseEntity.ok(guests);
    }


    @PostMapping("/eventdetails")
    public Event createEvent(@RequestBody Event event){
        return eventService.createEvent(event);
    }

    @PutMapping("/{guestId}/rsvp")
    public ResponseEntity<?> updateRSVP(@PathVariable Long guestId, @RequestBody GuestDTO guestUpdate) {
        return guestRepository.findById(guestId).map(guest -> {
            guest.updateResponse(
                    guestUpdate.getResponseStatus(),
                    guestUpdate.getFoodPreference(),
                    guestUpdate.getDietaryPreference(),
                    guestUpdate.getGuestLocation(),
                    guestUpdate.getName(),
                    guestUpdate.getAge()
            );
            guestRepository.save(guest);

            socketIOServer.getBroadcastOperations().sendEvent("rsvpUpdates", guestUpdate);

            return ResponseEntity.ok().body("RSVP updated successfully");
        }).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Guest not found"));
    }

}
