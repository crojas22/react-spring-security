package com.crojas.demo.service;

import com.crojas.demo.domain.Event;
import com.crojas.demo.domain.Role;
import com.crojas.demo.domain.User;
import com.crojas.demo.domain.UserDto;
import com.crojas.demo.repo.RoleRepository;
import com.crojas.demo.repo.UserRepository;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserService(UserRepository userRepository,
                       RoleRepository roleRepository,
                       BCryptPasswordEncoder bCryptPasswordEncoder) {

        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public void createUser(User user,
                           String roleName) {

        Role userRole = this.roleRepository.findByName(roleName);
        if (userRole != null){
            user.addRole(userRole);
            userRole.addUser(user);
        } else {
            Role role = new Role(roleName);
            role.addUser(user);
            user.addRole(role);
        }
        user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));
        this.userRepository.save(user);
    }

    public void createEvent(Event event, User user) {
        user.addEvent(event);
        this.userRepository.save(user);
    }

    public User findByUsername(String username) {
        return this.userRepository.findByUserName(username);
    }

    public boolean usernameExists(User user) {
        return this.userRepository.findByUserName(user.getUserName()) != null;
    }

    public UserDto toDto(@NonNull User user) {
        return new UserDto(user.getId(), user.getFirstName(), user.getLastName(), user.getUserName());
    }
}
