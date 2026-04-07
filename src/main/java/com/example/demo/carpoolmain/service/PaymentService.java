package com.example.demo.carpoolmain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.carpoolmain.repository.Payment;
import com.example.demo.carpoolmain.repository.PaymentRepository;

@Service   // ⭐ VERY IMPORTANT
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public Payment processPayment(Payment payment) {
        payment.setStatus("SUCCESS");
        return paymentRepository.save(payment);
    }
}