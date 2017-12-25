package com.crojas.demo.domain;

import lombok.Data;

@Data
public class UserDto {

    private int userId;
    private String firstName, lastName, username;

    public UserDto(int userId, String firstName, String lastName, String username) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
    }
}
