package com.crojas.demo.web.controller;

import com.crojas.demo.domain.Contact;
import com.crojas.demo.domain.User;
import com.crojas.demo.service.ContactService;
import com.crojas.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
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

    @RequestMapping(value = "delete/contact/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<List<Contact>> removeContact(@PathVariable Integer id, Principal principal) {
        User user = this.userService.findByUsername(principal.getName());
        this.contactService.removeContact(id);

        return new ResponseEntity<>(this.contactService.findUsersContact(user), HttpStatus.ACCEPTED);
    }

    @RequestMapping(value="favorite/{id}", method = RequestMethod.PATCH)
    public ResponseEntity<List<Contact>> favoriteContact(@PathVariable Integer id, Principal principal) {
        User user = this.userService.findByUsername(principal.getName());
        this.contactService.favoriteContact(id);

        return new ResponseEntity<>(this.contactService.findUsersContact(user), HttpStatus.ACCEPTED);
    }

    @RequestMapping(value="edit/contact", method = RequestMethod.PATCH)
    public ResponseEntity<List<Contact>> editContact(@RequestBody Contact contact, Principal principal) {
        User user = this.userService.findByUsername(principal.getName());
        this.contactService.editContact(contact);

        return new ResponseEntity<>(this.contactService.findUsersContact(user), HttpStatus.ACCEPTED);
    }
}
