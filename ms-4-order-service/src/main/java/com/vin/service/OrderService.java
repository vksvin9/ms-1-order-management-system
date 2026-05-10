package com.vin.service;

import java.util.List;

import com.vin.dto.OrderRequestDto;
import com.vin.dto.OrderResponseDto;

public interface OrderService {

    OrderResponseDto create(OrderRequestDto request);

    OrderResponseDto getById(Long id);

    List<OrderResponseDto> getAll();

    void delete(Long id);
}