package com.crojas.demo.domain;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Email;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
public class User extends BaseEntity{

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
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Set<Role> roles = new HashSet<>();

    protected User() {
        super();
    }

    public User(String firstName, String lastName, String password, String userName) {
        this();
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.userName = userName;
    }

    public void addRole(Role role) {
        roles.add(role);
    }
}
