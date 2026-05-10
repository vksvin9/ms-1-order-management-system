// File: ms-1-common-lib/src/main/java/com/vin/dto/ErrorResponse.java
package com.vin.dto;

import java.time.LocalDateTime;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Standard error response used by all microservices.
 *
 * Example:
 * {
 *   "success": false,
 *   "message": "Validation failed",
 *   "errors": {
 *     "name": "must not be blank",
 *     "price": "must be greater than 0"
 *   },
 *   "timestamp": "2026-05-10T12:05:00"
 * }
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {

    /**
     * Always false for error responses.
     */
    @Builder.Default
    private boolean success = false;

    /**
     * Human-readable error message.
     */
    private String message;

    /**
     * Field-wise validation errors or additional details.
     */
    private Map<String, String> errors;

    /**
     * Time when the error response was generated.
     */
    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();
}