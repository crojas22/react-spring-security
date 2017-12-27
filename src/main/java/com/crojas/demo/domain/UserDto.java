package com.crojas.demo.domain;

import lombok.Data;

@Data
public class UserDto {

    private Long userId;
    private String firstName, lastName, username;

    public UserDto(Long userId, String firstName, String lastName, String username) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
    }
}
