package com.event_rsvp.event_backend.Services;

import com.event_rsvp.event_backend.Entity.UserEntity;
import com.event_rsvp.event_backend.Repository.UserRepository;
import com.event_rsvp.event_backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImp implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImp(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User createUser(User user) {
        UserEntity userEntity = new UserEntity();
        userEntity.setUserId(user.getUserId());
        userEntity.setName(user.getName());
        userEntity.setEmail(user.getEmail());
        userRepository.save(userEntity);
        return user;
    }
}
