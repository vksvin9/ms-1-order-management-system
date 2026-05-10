package com.vin.dto.client;

import lombok.Data;

@Data
public class InventoryResponse {

    private Long id;
    private Long productId;
    private Integer availableQuantity;
}