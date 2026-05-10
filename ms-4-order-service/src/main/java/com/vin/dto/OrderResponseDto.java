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
    private Integer quantity;
    private BigDecimal totalAmount;
    private LocalDateTime orderDate;
}