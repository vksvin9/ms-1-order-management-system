package com.vin.controller;

import org.springframework.web.bind.annotation.*;

import com.vin.dto.ApiResponse;
import com.vin.dto.InventoryRequestDto;
import com.vin.dto.InventoryResponseDto;
import com.vin.service.InventoryService;
import com.vin.util.ResponseUtil;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService service;

    @PostMapping
    public ApiResponse<InventoryResponseDto> save(
            @Valid @RequestBody InventoryRequestDto request) {

        InventoryResponseDto response = service.save(request);
        return ResponseUtil.success(
                "Inventory saved successfully",
                response);
    }

    @GetMapping("/{productId}")
    public ApiResponse<InventoryResponseDto> getByProductId(
            @PathVariable("productId") Long productId) {

        return ResponseUtil.success(
                service.getByProductId(productId));
    }

    @PutMapping("/{productId}/reserve/{quantity}")
    public ApiResponse<InventoryResponseDto> reserve(
            @PathVariable("productId") Long productId,
            @PathVariable("quantity") Integer quantity) {

        InventoryResponseDto response =
                service.reserve(productId, quantity);

        return ResponseUtil.success(
                "Stock reserved successfully",
                response);
    }

    @PutMapping("/{productId}/release/{quantity}")
    public ApiResponse<InventoryResponseDto> release(
            @PathVariable("productId") Long productId,
            @PathVariable("quantity") Integer quantity) {

        InventoryResponseDto response =
                service.release(productId, quantity);

        return ResponseUtil.success(
                "Stock released successfully",
                response);
    }
}