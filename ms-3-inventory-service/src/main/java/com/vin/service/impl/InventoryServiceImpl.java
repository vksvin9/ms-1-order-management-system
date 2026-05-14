package com.vin.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.vin.client.ProductClient;
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
    private final ProductClient productClient;

    @Override
    public InventoryResponseDto save(
            InventoryRequestDto request
    ) {
        productClient.validateProductExists(
                request.getProductId()
        );

        Inventory inventory = repository.findByProductId(
                request.getProductId()
        ).orElse(
                Inventory.builder()
                        .productId(
                                request.getProductId()
                        )
                        .build()
        );

        inventory.setAvailableQuantity(
                request.getAvailableQuantity()
        );

        Inventory savedInventory =
                repository.save(inventory);

        return enrichWithProductName(
                InventoryMapper.toDto(savedInventory)
        );
    }

    @Override
    public List<InventoryResponseDto> getAll() {
        return repository.findAll()
                .stream()
                .map(InventoryMapper::toDto)
                .map(this::enrichWithProductName)
                .toList();
    }

    @Override
    public InventoryResponseDto getByProductId(
            Long productId
    ) {
        Inventory inventory =
                repository.findByProductId(productId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Inventory not found for product ID: "
                                                + productId
                                ));

        return enrichWithProductName(
                InventoryMapper.toDto(inventory)
        );
    }

    @Override
    public InventoryResponseDto reserve(
            Long productId,
            Integer quantity
    ) {
        Inventory inventory =
                repository.findByProductId(productId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Inventory not found for product ID: "
                                                + productId
                                ));

        if (inventory.getAvailableQuantity()
                < quantity) {
            throw new BusinessException(
                    "Insufficient stock"
            );
        }

        inventory.setAvailableQuantity(
                inventory.getAvailableQuantity()
                        - quantity
        );

        Inventory updatedInventory =
                repository.save(inventory);

        return enrichWithProductName(
                InventoryMapper.toDto(updatedInventory)
        );
    }

    @Override
    public InventoryResponseDto release(
            Long productId,
            Integer quantity
    ) {
        Inventory inventory =
                repository.findByProductId(productId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Inventory not found for product ID: "
                                                + productId
                                ));

        inventory.setAvailableQuantity(
                inventory.getAvailableQuantity()
                        + quantity
        );

        Inventory updatedInventory =
                repository.save(inventory);

        return enrichWithProductName(
                InventoryMapper.toDto(updatedInventory)
        );
    }

    @Override
    public void delete(Long productId) {
        Inventory inventory =
                repository.findByProductId(productId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Inventory not found for productId: "
                                                + productId
                                ));

        repository.delete(inventory);
    }

    private InventoryResponseDto enrichWithProductName(
            InventoryResponseDto response
    ) {
        response.setProductName(
                productClient.getProductName(
                        response.getProductId()
                )
        );

        return response;
    }
}