package com.event_rsvp.event_backend.DTO;

import com.event_rsvp.event_backend.Entity.GuestEntity.ResponseStatus;
import lombok.Data;

@Data
public class GuestDTO {
    private String name;

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

    public String getGuestLocation() {
        return guestLocation;
    }

    public void setGuestLocation(String guestLocation) {
        this.guestLocation = guestLocation;
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

    private Integer age;
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    private String guestLocation;
    private ResponseStatus responseStatus;
    private String foodPreference;
    private String dietaryPreference;
}
