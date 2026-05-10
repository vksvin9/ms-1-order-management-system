package com.vin.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.vin.client.InventoryClient;
import com.vin.dto.OrderRequestDto;
import com.vin.dto.OrderResponseDto;
import com.vin.entity.Order;
import com.vin.exception.ResourceNotFoundException;
import com.vin.mapper.OrderMapper;
import com.vin.repository.OrderRepository;
import com.vin.service.OrderService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository repository;
    private final InventoryClient inventoryClient;

    @Override
    public OrderResponseDto create(OrderRequestDto request) {

        // Reserve stock in Inventory Service.
        // If insufficient stock, a BusinessException is thrown
        // and the order is NOT saved.
        inventoryClient.reserveStock(
                request.getProductId(),
                request.getQuantity());

        // Save order only after successful stock reservation
        Order order = OrderMapper.toEntity(request);

        return OrderMapper.toDto(repository.save(order));
    }

    @Override
    public OrderResponseDto getById(Long id) {
        Order order = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found with id: " + id));

        return OrderMapper.toDto(order);
    }

    @Override
    public List<OrderResponseDto> getAll() {
        return repository.findAll()
                .stream()
                .map(OrderMapper::toDto)
                .toList();
    }

    @Override
    public void delete(Long id) {
        Order order = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found with id: " + id));

        repository.delete(order);
    }
}