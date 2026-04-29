package com.example.demo.carpoolmain.strategy;

public interface PaymentStrategy {
    String pay(double amount);
    String getMethodName();
}
