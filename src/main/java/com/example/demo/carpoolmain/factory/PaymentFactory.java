package com.example.demo.carpoolmain.factory;

import com.example.demo.carpoolmain.model.Payment;

public class PaymentFactory {

    public static Payment createPayment(double amount, String method) {
        Payment payment = new Payment();
        payment.setAmount(amount);
        payment.setMethod(method);
        payment.setStatus("PENDING");
        return payment;
    }
}