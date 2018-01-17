package com.crojas.demo.service;

import com.crojas.demo.domain.Contact;
import com.crojas.demo.domain.User;
import com.crojas.demo.repo.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    @Autowired
    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public void removeContact(Integer id) {
        this.contactRepository.delete(id);
    }

    public List<Contact> findUsersContact(User user) {
        return this.contactRepository.findAllByUserOrderByFirstNameAsc(user);
    }
}
