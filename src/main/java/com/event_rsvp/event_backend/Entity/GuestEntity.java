package com.event_rsvp.event_backend.Entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "guests")
public class GuestEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long guestId;
    @Column(nullable = true)
    private String name;
    private Integer age;
    @Column(nullable = false)
    private String email;
    @Column(name = "guest_location")
    private String guestLocation;
    @Enumerated(EnumType.STRING)
    private ResponseStatus responseStatus = ResponseStatus.PENDING;
    @Column(name = "food_preference")
    private String foodPreference;
    @Column(name = "dietary_preference")
    private String dietaryPreference;
    @ManyToOne
    @JoinColumn(name = "event_id")
    private EventEntity event;

    public enum ResponseStatus {
        PENDING, ACCEPTED, DECLINED;

        @JsonCreator
        public static ResponseStatus fromString(String value) {
            for (ResponseStatus status : ResponseStatus.values()) {
                if (status.name().equalsIgnoreCase(value)) {
                    return status;
                }
            }
            throw new IllegalArgumentException("Invalid response status: " + value);
        }

        @JsonValue
        public String toJson() {
            return name();
        }
    }

    public long getGuestId() {
        return guestId;
    }

    public void setGuestId(long guestId) {
        this.guestId = guestId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public ResponseStatus getResponseStatus() {
        return responseStatus;
    }

    public void setResponseStatus(ResponseStatus responseStatus) {
        this.responseStatus = responseStatus;
    }

    public String getFoodPreference() {
        return foodPreference;
    }

    public void setFoodPreference(String foodPreference) {
        this.foodPreference = foodPreference;
    }

    public String getDietaryPreference() {
        return dietaryPreference;
    }

    public void setDietaryPreference(String dietaryPreference) {
        this.dietaryPreference = dietaryPreference;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public EventEntity getEvent() {
        return event;
    }

    public void setEvent(EventEntity event) {
        this.event = event;
    }

    public String getGuestLocation() {
        return guestLocation;
    }

    public void setGuestLocation(String guestLocation) {
        this.guestLocation = guestLocation;
    }

    // Helper method to update response
    public void updateResponse(ResponseStatus status, String foodPref, String dietary, String guestLocation, String name, Integer age) {
        this.responseStatus = status;
        this.foodPreference = foodPref;
        this.dietaryPreference = dietary;
        this.guestLocation = guestLocation;
        this.name = name; // Add name
        this.age = age; // Add age
    }
}
