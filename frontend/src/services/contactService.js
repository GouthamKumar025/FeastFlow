import axios from "axios";

const CONT_BASE_URL = "http://localhost:8080/contacts";

class ContactService {
  saveContact(data) {
    return axios.post(`${CONT_BASE_URL}/submit`, data);
  }
}

export default new ContactService();
