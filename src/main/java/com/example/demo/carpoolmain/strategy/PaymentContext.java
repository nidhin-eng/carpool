package com.example.demo.carpoolmain.strategy;

public class PaymentContext {

    private PaymentStrategy strategy;

    public void setStrategy(PaymentStrategy strategy) {
        this.strategy = strategy;
    }

    public String executePayment(double amount) {
        if (strategy == null) {
            throw new RuntimeException("No payment strategy set");
        }
        return strategy.pay(amount);
    }

    public String getMethodName() {
        return strategy.getMethodName();
    }
}
