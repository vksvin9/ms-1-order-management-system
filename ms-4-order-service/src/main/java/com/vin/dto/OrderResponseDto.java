package com.vin.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderResponseDto {

    private Long id;

    private Long productId;

    // New field to display product name in API response and frontend
    private String productName;

    private Integer quantity;

    private BigDecimal totalAmount;

    private LocalDateTime orderDate;
}