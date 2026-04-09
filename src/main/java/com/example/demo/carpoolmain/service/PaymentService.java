package com.example.demo.carpoolmain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.carpoolmain.repository.Payment;
import com.example.demo.carpoolmain.repository.PaymentRepository;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public Payment processPayment(double amount, String method) {
    Payment payment = new Payment();   // 🔥 CREATION (Creator)
    payment.setAmount(amount);
    payment.setMethod(method);
    payment.setStatus("SUCCESS");

    return paymentRepository.save(payment);
}
}