package com.vin.client;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import com.vin.dto.ApiResponse;
import com.vin.dto.ProductResponseDto;
import com.vin.exception.BusinessException;

@Component
public class ProductClient {

    private final RestClient restClient;

    public ProductClient(RestClient.Builder builder) {
        this.restClient = builder.build();
    }

    public ProductResponseDto getProductById(Long productId) {
        try {
            ApiResponse<ProductResponseDto> response =
                    restClient.get()
                            .uri(
                                    "http://PRODUCT-SERVICE/api/products/{id}",
                                    productId
                            )
                            .retrieve()
                            .body(new ParameterizedTypeReference<
                                    ApiResponse<ProductResponseDto>>() {
                            });

            if (response == null || response.getData() == null) {
                throw new BusinessException(
                        "Product not found with id: " + productId
                );
            }

            return response.getData();
        } catch (Exception ex) {
            throw new BusinessException(
                    "Product not found with id: " + productId
            );
        }
    }

    public void validateProductExists(Long productId) {
        getProductById(productId);
    }

    public String getProductName(Long productId) {
        return getProductById(productId).getName();
    }
}