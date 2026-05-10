// File: ms-1-common-lib/src/main/java/com/vin/dto/ApiResponse.java
package com.vin.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Standard API response wrapper used by all microservices.
 *
 * Example Success Response:
 * {
 *   "success": true,
 *   "message": "Product created successfully",
 *   "data": {
 *     "id": 1
 *   },
 *   "timestamp": "2026-05-10T12:00:00"
 * }
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {

    /**
     * Indicates whether the request was successful.
     */
    private boolean success;

    /**
     * Human-readable message.
     */
    private String message;

    /**
     * Actual response payload.
     */
    private T data;

    /**
     * Time when the response was generated.
     */
    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();
}