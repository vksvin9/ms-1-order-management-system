package com.vin.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import com.vin.dto.client.ApiResponseWrapper;
import com.vin.dto.client.InventoryResponse;
import com.vin.exception.BusinessException;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class InventoryClient {

    private final RestClient restClient;

    @Value("${inventory.service.base-url}")
    private String inventoryServiceBaseUrl;

    public void reserveStock(Long productId, Integer quantity) {
        try {
            restClient.put()
                    .uri(inventoryServiceBaseUrl
                            + "/api/inventory/"
                            + productId
                            + "/reserve/"
                            + quantity)
                    .retrieve()
                    .body(new org.springframework.core.ParameterizedTypeReference<
                            ApiResponseWrapper<InventoryResponse>>() {
                    });
        } catch (Exception ex) {
            throw new BusinessException(
                    "Unable to reserve stock: " + ex.getMessage());
        }
    }
}