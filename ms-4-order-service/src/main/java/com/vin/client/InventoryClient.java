package com.vin.client;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import com.vin.dto.client.ApiResponseWrapper;
import com.vin.dto.client.InventoryResponse;
import com.vin.exception.BusinessException;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;

@Component
public class InventoryClient {

    private final RestClient restClient;

    public InventoryClient(RestClient.Builder builder) {
        this.restClient = builder.build();
    }

    @CircuitBreaker(name = "inventoryService", fallbackMethod = "reserveStockFallback")
    @Retry(name = "inventoryService")
    public void reserveStock(Long productId, Integer quantity) {
        try {
            restClient.put()
                    .uri(
                            "http://INVENTORY-SERVICE/api/inventory/{productId}/reserve/{quantity}",
                            productId,
                            quantity)
                    .retrieve()
                    .body(new ParameterizedTypeReference<ApiResponseWrapper<InventoryResponse>>() {
                    });
        } catch (Exception ex) {
            throw new BusinessException(
                    "Unable to reserve stock: " + ex.getMessage());
        }
    }

    public void reserveStockFallback(
            Long productId,
            Integer quantity,
            Throwable throwable) {
        throw new BusinessException(
                "Inventory reservation failed for product ID: "
                        + productId
                        + ", quantity: "
                        + quantity
                        + ". Root cause: "
                        + throwable.getMessage(),
                throwable);
    }
}