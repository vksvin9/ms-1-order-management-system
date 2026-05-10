package com.vin.dto.client;

import lombok.Data;

@Data
public class ApiResponseWrapper<T> {

    private boolean success;
    private String message;
    private T data;
}