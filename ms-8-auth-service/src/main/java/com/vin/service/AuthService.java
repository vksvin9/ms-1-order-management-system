package com.vin.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vin.dto.AuthResponse;
import com.vin.dto.LoginRequest;
import com.vin.dto.RegisterRequest;
import com.vin.entity.Role;
import com.vin.entity.User;
import com.vin.exception.BusinessException;
import com.vin.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;

        public AuthResponse register(RegisterRequest request) {

                if (userRepository.existsByUsername(request.getUsername())) {
                        throw new BusinessException("Username already exists");
                }

                Role role = request.getRole() == null
                                ? Role.USER
                                : request.getRole();

                User user = User.builder()
                                .username(request.getUsername())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .role(role)
                                .build();

                userRepository.save(user);

                return new AuthResponse(
                                null,
                                user.getUsername(),
                                user.getRole().name());
        }

        public AuthResponse login(LoginRequest request) {

                User user = userRepository.findByUsername(
                                request.getUsername())
                                .orElseThrow(() -> new BusinessException("Invalid credentials"));

                boolean valid = passwordEncoder.matches(
                                request.getPassword(),
                                user.getPassword());

                if (!valid) {
                        throw new BusinessException("Invalid credentials");
                }

                String token = jwtService.generateToken(
                                user.getUsername(),
                                user.getRole().name());

                return new AuthResponse(
                                token,
                                user.getUsername(),
                                user.getRole().name());
        }
}