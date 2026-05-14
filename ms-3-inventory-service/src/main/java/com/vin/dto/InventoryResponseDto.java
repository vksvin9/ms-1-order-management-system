package com.vin.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class InventoryResponseDto {

    private Long id;
    private Long productId;
    // New field to display product name in the frontend
    private String productName;
    private Integer availableQuantity;
}