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
        return this.contactRepository.findAllByUserOrderByNameAsc(user);
    }

    public void favoriteContact(Integer id) {
        Contact contact = this.contactRepository.findOne(id);
        contact.setFavorite(!contact.isFavorite());
        this.contactRepository.save(contact);
    }

    public void editContact(Contact contact) {
        Contact dbContact = this.contactRepository.findOne(contact.getId());
        if (contact.getName() != null) {
            dbContact.setName(contact.getName());
        }
        if (contact.getPhone() != null) {
            dbContact.setPhone(contact.getPhone());
        }
        if (contact.getEmail() != null) {
            dbContact.setEmail(contact.getEmail());
        }
        if (contact.getCompany() != null) {
            dbContact.setCompany(contact.getCompany());
        }
        this.contactRepository.save(dbContact);
    }
}
