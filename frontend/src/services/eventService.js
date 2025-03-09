import axios from "axios";

const EVENT_BASE_URL = "http://localhost:8080/events";

class EventService {
  saveEvent(event) {
    return axios.post(`${EVENT_BASE_URL}/eventdetails`, event);
  }

  updateRSVP(guestId, data) {
    return axios.put(`${EVENT_BASE_URL}/${guestId}/rsvp`, data);
  }

  // getEventById(eventId) {
  //   return axios.get(`${EVENT_BASE_URL}/${eventId}/eventdetails`);
  // }

  getEventsByUserId(userId) {
    return axios.get(`${EVENT_BASE_URL}/user/${userId}`);
  }

  getGuestsByEventId(eventId) {
    return axios.get(`${EVENT_BASE_URL}/guestrsvp/${eventId}`);
  }
}

export default new EventService();
