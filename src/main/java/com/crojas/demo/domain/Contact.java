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
    private String name, phone,email, company;
    private boolean favorite;

    @ManyToOne
    @JsonIgnore
    private User user;

    {
        favorite = false;
    }

    protected Contact() {
    }

    public Contact(String name, String company, String email, String phone) {
        this.name = name;
        this.company = company;
        this.email = email;
        this.phone = phone;
    }
}
