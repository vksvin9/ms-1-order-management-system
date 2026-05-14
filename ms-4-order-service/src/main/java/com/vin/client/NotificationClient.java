package com.vin.client;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class NotificationClient {

    private final RestClient restClient;

    public NotificationClient(RestClient.Builder builder) {
        this.restClient = builder.build();
    }

    @CircuitBreaker(
            name = "notificationService",
            fallbackMethod = "sendOrderCreatedNotificationFallback"
    )
    @Retry(name = "notificationService")
    public void sendOrderCreatedNotification(
            Long orderId,
            Long productId,
            Integer quantity,
            Double totalAmount
    ) {
        restClient.post()
                .uri(
                        "http://NOTIFICATION-SERVICE/api/notifications/order-created"
                                + "?orderId={orderId}"
                                + "&productId={productId}"
                                + "&quantity={quantity}"
                                + "&totalAmount={totalAmount}",
                        orderId,
                        productId,
                        quantity,
                        totalAmount
                )
                .retrieve()
                .toBodilessEntity();

        log.info(
                "Notification sent successfully for order {}",
                orderId
        );
    }

    /**
     * Notification failures should not break order creation.
     * This fallback logs the issue and returns normally.
     */
    public void sendOrderCreatedNotificationFallback(
            Long orderId,
            Long productId,
            Integer quantity,
            Double totalAmount,
            Throwable throwable
    ) {
        log.error(
                "Notification Service unavailable. "
                        + "Order was created successfully, but notification "
                        + "could not be sent for orderId={}",
                orderId,
                throwable
        );
    }
}