package com.vin.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vin.dto.ApiResponse;
import com.vin.dto.ProductRequestDto;
import com.vin.dto.ProductResponseDto;
import com.vin.service.ProductService;
import com.vin.util.ResponseUtil;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService service;

    @PostMapping
    public ApiResponse<ProductResponseDto> create(
            @Valid @RequestBody ProductRequestDto request) {

        ProductResponseDto response = service.create(request);
        return ResponseUtil.success("Product created successfully", response);
    }

    @GetMapping("/{id}")
    public ApiResponse<ProductResponseDto> getById(
            @PathVariable("id") Long id) {

        return ResponseUtil.success(service.getById(id));
    }

    @GetMapping
    public ApiResponse<List<ProductResponseDto>> getAll() {
        return ResponseUtil.success(service.getAll());
    }

    @PutMapping("/{id}")
    public ApiResponse<ProductResponseDto> update(
            @PathVariable("id") Long id,
            @Valid @RequestBody ProductRequestDto request) {

        ProductResponseDto response = service.update(id, request);
        return ResponseUtil.success("Product updated successfully", response);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(
            @PathVariable("id") Long id) {

        service.delete(id);
        return ResponseUtil.success("Product deleted successfully");
    }
}