package com.vin.service;

import java.util.List;

import com.vin.dto.InventoryRequestDto;
import com.vin.dto.InventoryResponseDto;

public interface InventoryService {

    InventoryResponseDto save(InventoryRequestDto request);

    List<InventoryResponseDto> getAll();

    InventoryResponseDto getByProductId(Long productId);

    InventoryResponseDto reserve(Long productId, Integer quantity);

    InventoryResponseDto release(Long productId, Integer quantity);

    void delete(Long productId);
}