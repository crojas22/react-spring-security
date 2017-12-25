package com.crojas.demo.exception;

import lombok.Data;

import java.util.List;

@Data
public class ExceptionResponse {

    private String errorCode;
    private String errorMessage;
    private List<String> errors;

    public ExceptionResponse() {
    }
}
