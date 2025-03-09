package com.event_rsvp.event_backend.Services;

import com.event_rsvp.event_backend.DTO.GuestDTO;
import com.event_rsvp.event_backend.Entity.EventEntity;
import com.event_rsvp.event_backend.Entity.GuestEntity;
import com.event_rsvp.event_backend.Repository.EventRepository;
import com.event_rsvp.event_backend.Repository.GuestRepository;
import com.event_rsvp.event_backend.model.Event;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class EventServiceImp implements EventService{

    @Autowired
    private final EventRepository eventRepository;

    @Autowired
    private final GuestRepository guestRepository;

    @Autowired
    private EmailService emailService;

    public EventServiceImp(EventRepository eventRepository, GuestRepository guestRepository) {
        this.eventRepository = eventRepository;
        this.guestRepository = guestRepository;
    }

    @Override
    public Event createEvent(Event event) {
        EventEntity eventEntity = convertToEntity(event);
        eventRepository.save(eventEntity);

        // process the guests
        if(event.getGuestDetails() != null){
            Arrays.stream(event.getGuestDetails().split(",")).
                        map(String::trim).
                        forEach(email ->{
                            GuestEntity guest = new GuestEntity();
                            guest.setEmail(email);
                            guest.setEvent(eventEntity);
                            guestRepository.save(guest);

                            // email service
                           emailService.sendInvitation(email, event.getEventId(), guest.getGuestId());
                        });
        }
        return event;

    }

    @Override
    public Event getEventById(long eventId) {
        EventEntity eventEntity = eventRepository.findById(eventId).orElseThrow(
                () -> new RuntimeException("Event Not found")
        );
        Event event = new Event();
        BeanUtils.copyProperties(eventEntity,event);
        return event;
    }

    @Override
    public List<Event> getEventsByUserId(String userId) {
        List<EventEntity> eventEntities = eventRepository.findByUserId(userId);
        return eventEntities.stream()
                .map(eventEntity -> {
                    Event event = new Event();
                    BeanUtils.copyProperties(eventEntity, event);
                    return event;
                })
                .toList();
    }

    @Override
    public List<GuestDTO> getGuestByEventId(long eventId){
        List<GuestEntity> guestDetails = guestRepository.findByEvent_EventId(eventId);
        return guestDetails.stream()
                .map(
                        guest -> {
                            GuestDTO dto = new GuestDTO();
                            dto.setName(guest.getName());
                            dto.setAge(guest.getAge());
                            dto.setEmail(guest.getEmail());
                            dto.setGuestLocation(guest.getGuestLocation());
                            dto.setResponseStatus(guest.getResponseStatus());
                            dto.setFoodPreference(guest.getFoodPreference());
                            dto.setDietaryPreference(guest.getDietaryPreference());
                            return dto;
                        }
                ).toList();
    }

    public EventEntity convertToEntity(Event event){
        EventEntity eventEntity = new EventEntity();
        eventEntity.setEventId(event.getEventId());
        eventEntity.setUserId(event.getUserId());
        eventEntity.setEventName(event.getEventName());
        eventEntity.setDate(event.getDate());
        eventEntity.setTime(event.getTime());
        eventEntity.setEventLocation(event.getEventLocation());
        eventEntity.setVenue(event.getVenue());
        eventEntity.setMapLink(event.getMapLink());
        eventEntity.setGuestDetails(event.getGuestDetails());
        eventRepository.save(eventEntity);
        return eventEntity;
    }
}
