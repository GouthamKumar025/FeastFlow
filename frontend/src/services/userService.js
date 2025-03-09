import axios from "axios";

const USER_BASE_URL = "http://localhost:8080/userdetails";

class UserService {
  saveUsers(user) {
    return axios.post(`${USER_BASE_URL}/user`, user);
  }
}

export default new UserService();
