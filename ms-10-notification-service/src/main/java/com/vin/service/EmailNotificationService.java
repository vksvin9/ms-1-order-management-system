package com.vin.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailNotificationService {

    @Value("${notification.email.enabled:true}")
    private boolean emailEnabled;

    @Value("${notification.email.from:no-reply@vin.com}")
    private String fromEmail;

    @Value("${notification.email.to:admin@vin.com}")
    private String toEmail;

    @Async
    public void sendOrderCreatedNotification(
            Long orderId,
            Long productId,
            Integer quantity,
            Double totalAmount
    ) {
        if (!emailEnabled) {
            log.info("Email notification is disabled.");
            return;
        }

        log.info("========================================");
        log.info("SIMULATED EMAIL NOTIFICATION");
        log.info("From        : {}", fromEmail);
        log.info("To          : {}", toEmail);
        log.info("Subject     : Order Created Successfully");
        log.info("Order ID    : {}", orderId);
        log.info("Product ID  : {}", productId);
        log.info("Quantity    : {}", quantity);
        log.info("Total Amount: {}", totalAmount);
        log.info("========================================");
    }
}