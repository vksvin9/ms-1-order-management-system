package com.vin.controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.vin.dto.ApiResponse;
import com.vin.dto.AuthResponse;
import com.vin.dto.LoginRequest;
import com.vin.dto.RegisterRequest;
import com.vin.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ApiResponse<AuthResponse> register(
            @Validated @RequestBody RegisterRequest request) {

        AuthResponse response = authService.register(request);

        ApiResponse<AuthResponse> apiResponse = new ApiResponse<>();
        apiResponse.setSuccess(true);
        apiResponse.setMessage("User registered successfully");
        apiResponse.setData(response);

        return apiResponse;
    }

    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(
            @Validated @RequestBody LoginRequest request) {

        AuthResponse response = authService.login(request);

        ApiResponse<AuthResponse> apiResponse = new ApiResponse<>();
        apiResponse.setSuccess(true);
        apiResponse.setMessage("Login successful");
        apiResponse.setData(response);

        return apiResponse;
    }
}