package com.example.demo.carpoolmain.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/payments")
public class PaymentController {

    @PostMapping("/pay")
    public ResponseEntity<Map<String, Object>> pay(@RequestBody Map<String, Object> paymentData) {
        try {
            System.out.println("Payment received: " + paymentData);
            double amount = ((Number) paymentData.get("amount")).doubleValue();
            String method = (String) paymentData.get("method");

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Payment processed successfully");

            Map<String, Object> paymentMap = new HashMap<>();
            paymentMap.put("id", System.currentTimeMillis());
            paymentMap.put("amount", amount);
            paymentMap.put("method", method);
            paymentMap.put("status", "COMPLETED");
            response.put("data", paymentMap);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println("Payment error: " + e.getMessage());
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error processing payment: " + e.getMessage());
            return ResponseEntity.status(400).body(response);
        }
    }
}