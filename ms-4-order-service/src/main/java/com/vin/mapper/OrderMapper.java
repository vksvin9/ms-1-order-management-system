package com.vin.mapper;

import com.vin.dto.OrderRequestDto;
import com.vin.dto.OrderResponseDto;
import com.vin.entity.Order;

public final class OrderMapper {

    private OrderMapper() {
    }

    public static Order toEntity(OrderRequestDto dto) {
        return Order.builder()
                .productId(dto.getProductId())
                .quantity(dto.getQuantity())
                .totalAmount(dto.getTotalAmount())
                .build();
    }

    public static OrderResponseDto toDto(Order order) {
        return OrderResponseDto.builder()
                .id(order.getId())
                .productId(order.getProductId())
                .quantity(order.getQuantity())
                .totalAmount(order.getTotalAmount())
                .orderDate(order.getOrderDate())
                .build();
    }
}