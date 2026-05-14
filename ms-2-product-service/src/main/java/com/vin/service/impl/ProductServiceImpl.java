package com.vin.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.vin.dto.ProductRequestDto;
import com.vin.dto.ProductResponseDto;
import com.vin.entity.Product;
import com.vin.exception.BusinessException;
import com.vin.exception.ResourceNotFoundException;
import com.vin.mapper.ProductMapper;
import com.vin.repository.ProductRepository;
import com.vin.service.ProductService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository repository;

    @Override
    public ProductResponseDto create(ProductRequestDto request) {

        if (repository.existsByNameIgnoreCase(request.getName())) {
            throw new BusinessException(
                    "Product with name '" + request.getName()
                            + "' already exists."
            );
        }

        Product product = ProductMapper.toEntity(request);

        return ProductMapper.toDto(
                repository.save(product)
        );
    }

    @Override
    public ProductResponseDto getById(Long id) {
        Product product = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found with id: " + id
                        ));

        return ProductMapper.toDto(product);
    }

    @Override
    public List<ProductResponseDto> getAll() {
        return repository.findAll()
                .stream()
                .map(ProductMapper::toDto)
                .toList();
    }

    @Override
    public ProductResponseDto update(
            Long id,
            ProductRequestDto request
    ) {
        Product product = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found with id: " + id
                        ));

        repository.findByNameIgnoreCase(request.getName())
                .ifPresent(existingProduct -> {
                    if (!existingProduct.getId().equals(id)) {
                        throw new BusinessException(
                                "Product with name '"
                                        + request.getName()
                                        + "' already exists."
                        );
                    }
                });

        ProductMapper.updateEntity(product, request);

        return ProductMapper.toDto(
                repository.save(product)
        );
    }

    @Override
    public void delete(Long id) {
        Product product = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found with id: " + id
                        ));

        repository.delete(product);
    }
}