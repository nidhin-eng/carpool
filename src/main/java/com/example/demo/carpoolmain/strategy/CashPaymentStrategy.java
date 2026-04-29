package com.example.demo.carpoolmain.strategy;

public class CashPaymentStrategy implements PaymentStrategy {

    @Override
    public String pay(double amount) {
        return "Cash payment of Rs." + amount + " to be paid to driver directly";
    }

    @Override
    public String getMethodName() {
        return "Cash";
    }
}
