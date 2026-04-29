package com.example.demo.carpoolmain.strategy;

public class UpiPaymentStrategy implements PaymentStrategy {

    private String upiId;

    public UpiPaymentStrategy(String upiId) {
        this.upiId = upiId;
    }

    @Override
    public String pay(double amount) {
        return "Paid Rs." + amount + " via UPI (" + upiId + ")";
    }

    @Override
    public String getMethodName() {
        return "UPI";
    }
}
