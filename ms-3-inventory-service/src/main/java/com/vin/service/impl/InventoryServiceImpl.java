package com.vin.service.impl;

import org.springframework.stereotype.Service;

import com.vin.dto.InventoryRequestDto;
import com.vin.dto.InventoryResponseDto;
import com.vin.entity.Inventory;
import com.vin.exception.BusinessException;
import com.vin.exception.ResourceNotFoundException;
import com.vin.mapper.InventoryMapper;
import com.vin.repository.InventoryRepository;
import com.vin.service.InventoryService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {

    private final InventoryRepository repository;

    @Override
    public InventoryResponseDto save(InventoryRequestDto request) {
        Inventory inventory = repository.findByProductId(request.getProductId())
                .orElse(Inventory.builder().productId(request.getProductId()).build());

        inventory.setAvailableQuantity(request.getAvailableQuantity());

        return InventoryMapper.toDto(repository.save(inventory));
    }

    @Override
    public InventoryResponseDto getByProductId(Long productId) {
        Inventory inventory = repository.findByProductId(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Inventory not found for product ID: " + productId));

        return InventoryMapper.toDto(inventory);
    }

    @Override
    public InventoryResponseDto reserve(Long productId, Integer quantity) {
        Inventory inventory = repository.findByProductId(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Inventory not found for product ID: " + productId));

        if (inventory.getAvailableQuantity() < quantity) {
            throw new BusinessException("Insufficient stock");
        }

        inventory.setAvailableQuantity(
                inventory.getAvailableQuantity() - quantity);

        return InventoryMapper.toDto(repository.save(inventory));
    }

    @Override
    public InventoryResponseDto release(Long productId, Integer quantity) {
        Inventory inventory = repository.findByProductId(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Inventory not found for product ID: " + productId));

        inventory.setAvailableQuantity(
                inventory.getAvailableQuantity() + quantity);

        return InventoryMapper.toDto(repository.save(inventory));
    }
}