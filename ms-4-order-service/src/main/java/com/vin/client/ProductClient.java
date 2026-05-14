package com.vin.client;

import java.math.BigDecimal;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import com.vin.dto.ApiResponse;
import com.vin.dto.ProductResponseDto;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;

@Component
public class ProductClient {

    private final RestClient restClient;

    public ProductClient(RestClient.Builder builder) {
        this.restClient = builder.build();
    }

    @CircuitBreaker(
            name = "productService",
            fallbackMethod = "getProductFallback"
    )
    @Retry(name = "productService")
    public ProductResponseDto getProductById(
            Long productId
    ) {
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

        if (response == null
                || response.getData() == null) {
            throw new RuntimeException(
                    "Product not found: "
                            + productId
            );
        }

        return response.getData();
    }

    public BigDecimal getProductPrice(
            Long productId
    ) {
        return BigDecimal.valueOf(
                getProductById(productId)
                        .getPrice()
        );
    }

    public String getProductName(
            Long productId
    ) {
        return getProductById(productId)
                .getName();
    }

    public ProductResponseDto getProductFallback(
            Long productId,
            Throwable throwable
    ) {
        throw new RuntimeException(
                "Product Service is currently unavailable. "
                        + "Unable to fetch product details for product ID: "
                        + productId,
                throwable
        );
    }
}