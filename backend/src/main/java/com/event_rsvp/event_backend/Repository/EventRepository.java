package com.event_rsvp.event_backend.Repository;

import com.event_rsvp.event_backend.DTO.EventDTO;
import com.event_rsvp.event_backend.Entity.EventEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<EventEntity,Long> {
    @Query("SELECT new com.event_rsvp.event_backend.DTO.EventDTO(e.eventId,e.date,e.eventName,e.eventLocation,e.venue,e.time,e.guestDetails,e.mapLink) FROM EventEntity e WHERE e.eventId = :eventId")
    EventDTO findEventById(@Param("eventId") long eventId);

    List<EventEntity> findByUserId(String userId);
}
