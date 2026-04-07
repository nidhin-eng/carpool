package com.example.demo.carpoolmain.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.demo.carpoolmain.repository.Payment;
import com.example.demo.carpoolmain.service.PaymentService;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/pay")
    public Payment pay(@RequestBody Payment payment) {
        return paymentService.processPayment(payment);
    }
}