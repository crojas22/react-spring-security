package com.crojas.demo.web.controller;

import com.crojas.demo.domain.User;
import com.crojas.demo.service.ContactService;
import com.crojas.demo.service.EventService;
import com.crojas.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthenticationController {

    private final UserService userService;
    private final EventService eventService;
    private final ContactService contactService;

    @Autowired
    public AuthenticationController(UserService userService,
                                    EventService eventService,
                                    ContactService contactService) {
        this.userService = userService;
        this.eventService = eventService;
        this.contactService = contactService;
    }


    @RequestMapping(value = "/register", method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity<Map<String,Object>> registerUser(@Valid @RequestBody User user) {
        Map<String, Object> message = new HashMap<>();
        if (this.userService.usernameExists(user)) {
            message.put("errorMessage", "Email already exists");
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }

        this.userService.createUser(user, "ROLE_USER");

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/verification")
    public ResponseEntity<Map<String,Object>> getUserInfo(Principal principal) {
        User user = this.userService.findByUsername(principal.getName());
        Map<String, Object> message = new HashMap<>();

        if (user == null) {
            message.put("errorMessage", "Need to sign in");
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
        message.put("user", this.userService.toDto(user));
        message.put("events", this.eventService.findUserEvents(user));
        message.put("contacts", this.contactService.findUsersContact(user));

        return new ResponseEntity<>(message, HttpStatus.ACCEPTED);
    }

}
