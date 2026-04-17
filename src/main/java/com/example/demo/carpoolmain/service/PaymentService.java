package com.example.demo.carpoolmain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.carpoolmain.model.Payment;
import com.example.demo.carpoolmain.repository.PaymentRepository;
import com.example.demo.carpoolmain.factory.PaymentFactory;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public Payment processPayment(double amount, String method) {

        Payment payment = PaymentFactory.createPayment(amount, method);

        payment.setStatus("SUCCESS");

        return paymentRepository.save(payment);
    }
}