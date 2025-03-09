package com.event_rsvp.event_backend.Controller;

import com.event_rsvp.event_backend.Services.UserServiceImp;
import com.event_rsvp.event_backend.model.User;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/userdetails")
public class UserController {

    private final UserServiceImp userServiceImp;
    public UserController(UserServiceImp userServiceImp) {
        this.userServiceImp = userServiceImp;
    }

    @PostMapping("/user")
    public User saveUserDetails(@RequestBody User user){
       return userServiceImp.createUser(user);
    }
}
