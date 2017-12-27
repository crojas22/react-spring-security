package com.crojas.demo.web.controller;

import com.crojas.demo.domain.Role;
import com.crojas.demo.domain.User;
import com.crojas.demo.domain.UserDto;
import com.crojas.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class AuthenticationController {

    private final UserService userService;

    @Autowired
    public AuthenticationController(UserService userService) {
        this.userService = userService;
    }


    @RequestMapping(value = "/register", method = RequestMethod.POST, produces = "application/json")
    public UserDto registerUser(@Valid @RequestBody User user) {
        this.userService.createUser(user);
        return this.userService.toDto(user);
    }

}
