package com.crojas.demo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotNull
    private String firstName, lastName, phoneNumber;
    private String email, company;
    private boolean favorite;

    @ManyToOne
    @JsonIgnore
    private User user;

    {
        favorite = false;
    }

    protected Contact() {
    }

    public Contact(String firstName, String lastName, String company, String email, String phoneNumber, User user) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.company = company;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
}
