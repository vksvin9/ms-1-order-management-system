package com.vin.mapper;

import com.vin.dto.InventoryRequestDto;
import com.vin.dto.InventoryResponseDto;
import com.vin.entity.Inventory;

public final class InventoryMapper {

    private InventoryMapper() {
    }

    public static Inventory toEntity(InventoryRequestDto dto) {
        return Inventory.builder()
                .productId(dto.getProductId())
                .availableQuantity(dto.getAvailableQuantity())
                .build();
    }

    public static InventoryResponseDto toDto(Inventory inventory) {
        return InventoryResponseDto.builder()
                .id(inventory.getId())
                .productId(inventory.getProductId())
                .availableQuantity(inventory.getAvailableQuantity())
                .build();
    }
}