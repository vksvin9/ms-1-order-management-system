package com.vin.mapper;

import com.vin.dto.ProductRequestDto;
import com.vin.dto.ProductResponseDto;
import com.vin.entity.Product;

public final class ProductMapper {

    private ProductMapper() {
    }

    public static Product toEntity(ProductRequestDto dto) {
        if (dto == null) {
            return null;
        }

        return Product.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .build();
    }

    public static ProductResponseDto toDto(Product entity) {
        if (entity == null) {
            return null;
        }

        return ProductResponseDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .price(entity.getPrice())
                .build();
    }

    public static void updateEntity(
            Product entity,
            ProductRequestDto dto) {

        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setPrice(dto.getPrice());
    }
}