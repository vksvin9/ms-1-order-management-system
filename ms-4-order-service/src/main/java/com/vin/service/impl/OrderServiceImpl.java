package com.vin.service.impl;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

import com.vin.client.InventoryClient;
import com.vin.client.NotificationClient;
import com.vin.client.ProductClient;
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
    private final ProductClient productClient;
    private final NotificationClient notificationClient;

    @Override
    public OrderResponseDto create(
            OrderRequestDto request
    ) {
        BigDecimal productPrice =
                productClient.getProductPrice(
                        request.getProductId()
                );

        BigDecimal totalAmount =
                productPrice.multiply(
                        BigDecimal.valueOf(
                                request.getQuantity()
                        )
                );

        inventoryClient.reserveStock(
                request.getProductId(),
                request.getQuantity()
        );

        Order order = OrderMapper.toEntity(
                request,
                totalAmount
        );

        Order savedOrder =
                repository.save(order);

        notificationClient.sendOrderCreatedNotification(
                savedOrder.getId(),
                savedOrder.getProductId(),
                savedOrder.getQuantity(),
                savedOrder.getTotalAmount()
                        .doubleValue()
        );

        return enrichWithProductName(
                OrderMapper.toDto(savedOrder)
        );
    }

    @Override
    public OrderResponseDto getById(
            Long id
    ) {
        Order order = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found with id: "
                                        + id
                        ));

        return enrichWithProductName(
                OrderMapper.toDto(order)
        );
    }

    @Override
    public List<OrderResponseDto> getAll() {
        return repository.findAll()
                .stream()
                .map(OrderMapper::toDto)
                .map(this::enrichWithProductName)
                .toList();
    }

    @Override
    public void delete(Long id) {
        Order order = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found with id: "
                                        + id
                        ));

        repository.delete(order);
    }

    private OrderResponseDto enrichWithProductName(
            OrderResponseDto response
    ) {
        response.setProductName(
                productClient.getProductName(
                        response.getProductId()
                )
        );

        return response;
    }
}