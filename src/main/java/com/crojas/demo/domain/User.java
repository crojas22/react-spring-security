package com.crojas.demo.domain;

import lombok.Data;
import org.hibernate.validator.constraints.Email;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @NotNull
    private String firstName, lastName;
    @NotNull
    @Size(min = 3, max = 100, message = "Password must be {min} to {max} characters in length.")
    private String password;
    @NotNull
    @Size(min = 5, max = 30, message = "Email must be {min} to {max} characters in length.")
    @Email
    @Column(unique = true)
    private String userName;

    protected User() {}

    public User(String firstName, String lastName, String password, String userName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.userName = userName;
    }
}
