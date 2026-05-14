package com.vin.controller;

import com.vin.service.EmailNotificationService;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final EmailNotificationService emailNotificationService;

    @PostMapping("/order-created")
    public String notifyOrderCreated(
            @RequestParam("orderId")
            @NotNull
            Long orderId,

            @RequestParam("productId")
            @NotNull
            Long productId,

            @RequestParam("quantity")
            @NotNull
            @Min(1)
            Integer quantity,

            @RequestParam("totalAmount")
            @NotNull
            @Min(0)
            Double totalAmount
    ) {
        emailNotificationService.sendOrderCreatedNotification(
                orderId,
                productId,
                quantity,
                totalAmount
        );

        return "Email notification triggered successfully.";
    }
}