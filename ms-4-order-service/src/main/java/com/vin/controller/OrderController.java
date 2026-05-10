package com.vin.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.vin.dto.ApiResponse;
import com.vin.dto.OrderRequestDto;
import com.vin.dto.OrderResponseDto;
import com.vin.service.OrderService;
import com.vin.util.ResponseUtil;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService service;

    @PostMapping
    public ApiResponse<OrderResponseDto> create(
            @Valid @RequestBody OrderRequestDto request) {

        return ResponseUtil.success(
                "Order created successfully",
                service.create(request));
    }

    @GetMapping("/{id}")
    public ApiResponse<OrderResponseDto> getById(
            @PathVariable("id") Long id) {

        return ResponseUtil.success(service.getById(id));
    }

    @GetMapping
    public ApiResponse<List<OrderResponseDto>> getAll() {
        return ResponseUtil.success(service.getAll());
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(
            @PathVariable("id") Long id) {

        service.delete(id);
        return ResponseUtil.success("Order deleted successfully");
    }
}