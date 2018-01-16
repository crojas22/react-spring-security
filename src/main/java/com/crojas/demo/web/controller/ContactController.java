package com.crojas.demo.web.controller;

import com.crojas.demo.domain.Contact;
import com.crojas.demo.domain.User;
import com.crojas.demo.service.ContactService;
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
import java.util.List;

@Controller
@RequestMapping(value = "/api/")
public class ContactController {

    private final ContactService contactService;
    private final UserService userService;

    @Autowired
    public ContactController(ContactService contactService, UserService userService) {
        this.contactService = contactService;
        this.userService = userService;
    }

    @RequestMapping(value = "newcontact", method = RequestMethod.POST)
    public ResponseEntity<List<Contact>> createContact(@Valid @RequestBody Contact contact, Principal principal) {
        User user = this.userService.findByUsername(principal.getName());
        this.userService.createContact(contact, user);

        return new ResponseEntity<>(this.contactService.findUsersContact(user), HttpStatus.CREATED);
    }
}
