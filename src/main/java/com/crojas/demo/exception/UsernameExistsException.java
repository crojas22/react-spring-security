package com.crojas.demo.exception;

public class UsernameExistsException extends Throwable {

    public UsernameExistsException(final String message) {
        super(message);
    }
}
