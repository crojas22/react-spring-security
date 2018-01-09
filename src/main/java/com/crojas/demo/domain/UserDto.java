package com.crojas.demo.domain;

import lombok.Data;

@Data
public class UserDto {

    private Integer userId;
    private String firstName, lastName, username;

    public UserDto(Integer userId, String firstName, String lastName, String username) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
    }
}
