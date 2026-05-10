package com.vin.service;

import java.util.List;

import com.vin.dto.ProductRequestDto;
import com.vin.dto.ProductResponseDto;

public interface ProductService {

    ProductResponseDto create(ProductRequestDto request);

    ProductResponseDto getById(Long id);

    List<ProductResponseDto> getAll();

    ProductResponseDto update(Long id, ProductRequestDto request);

    void delete(Long id);
}