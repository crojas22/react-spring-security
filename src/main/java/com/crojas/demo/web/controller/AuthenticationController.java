package com.crojas.demo.web.controller;

import com.crojas.demo.domain.User;
import com.crojas.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthenticationController {

    private final UserService userService;

    @Autowired
    public AuthenticationController(UserService userService) {
        this.userService = userService;
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

}
