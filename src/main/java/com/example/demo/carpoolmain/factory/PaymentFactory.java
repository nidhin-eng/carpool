package com.example.demo.carpoolmain.factory;

import com.example.demo.carpoolmain.repository.Payment;

public class PaymentFactory {

    public static Payment createPayment(double amount, String method) {
        Payment payment = new Payment();
        payment.setAmount(amount);
        payment.setMethod(method);
        return payment;
    }
}