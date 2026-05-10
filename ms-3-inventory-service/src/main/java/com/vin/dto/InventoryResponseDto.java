package com.vin.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class InventoryResponseDto {

    private Long id;
    private Long productId;
    private Integer availableQuantity;
}