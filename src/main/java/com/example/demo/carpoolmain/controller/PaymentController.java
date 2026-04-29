package com.example.demo.carpoolmain.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.Map;
import com.example.demo.carpoolmain.strategy.*;

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

            // Strategy Pattern - select strategy based on method
            PaymentContext context = new PaymentContext();

            switch (method.toUpperCase()) {
                case "UPI":
                    String upiId = paymentData.get("upiId") != null ? (String) paymentData.get("upiId") : "pescarpool@upi";
                    context.setStrategy(new UpiPaymentStrategy(upiId));
                    break;
                case "CARD":
                    String cardNumber = paymentData.get("cardNumber") != null ? (String) paymentData.get("cardNumber") : "0000000000000000";
                    context.setStrategy(new CardPaymentStrategy(cardNumber));
                    break;
                case "CASH":
                default:
                    context.setStrategy(new CashPaymentStrategy());
                    break;
            }

            String result = context.executePayment(amount);
            System.out.println(result);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Payment processed successfully");

            Map<String, Object> paymentMap = new HashMap<>();
            paymentMap.put("id", System.currentTimeMillis());
            paymentMap.put("amount", amount);
            paymentMap.put("method", context.getMethodName());
            paymentMap.put("status", "COMPLETED");
            paymentMap.put("details", result);
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