package com.event_rsvp.event_backend.Repository;

import com.event_rsvp.event_backend.Entity.GuestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GuestRepository extends JpaRepository<GuestEntity,Long> {
    List<GuestEntity> findByEvent_EventId(long eventId);
}
