package com.crojas.demo.web.controller;

import com.crojas.demo.domain.Event;
import com.crojas.demo.domain.User;
import com.crojas.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;
import java.security.Principal;
import java.util.Map;

@Controller
@RequestMapping(value = "/api/")
public class EventController {

    private final UserService userService;

    @Autowired
    public EventController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(value = "create", method = RequestMethod.POST)
    public ResponseEntity<Map<String,Object>> createEvent(@Valid @RequestBody Event event, Principal principal) {
        System.out.println(principal.getName());
        User user = this.userService.findByUsername(principal.getName());
        this.userService.createEvent(event, user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}