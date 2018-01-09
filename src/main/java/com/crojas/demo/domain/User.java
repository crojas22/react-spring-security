package com.crojas.demo.domain;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Email;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.*;

@Entity
@Getter
@Setter
public class User extends BaseEntity {

    @NotNull
    private String firstName, lastName;

    @NotNull
    @Size(min = 5, max = 30, message = "Email must be {min} to {max} characters in length.")
    @Email
    @Column(unique = true)
    private String userName;

    @Size(min = 3, max = 100, message = "Password must be {min} to {max} characters in length.")
    private String password;


    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Set<Role> roles;

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<Event> events;

    protected User() {
        super();
        roles = new HashSet<>();
        events = new ArrayList<>();
    }

    public void addEvent(Event event) {
        event.setUser(this);
        events.add(event);
    }

    public void addRole(Role role) {
        roles.add(role);
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
