package com.example.demo.carpoolmain.strategy;

public class CardPaymentStrategy implements PaymentStrategy {

    private String cardNumber;

    public CardPaymentStrategy(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    @Override
    public String pay(double amount) {
        String masked = "**** **** **** " + cardNumber.substring(cardNumber.length() - 4);
        return "Paid Rs." + amount + " via Card (" + masked + ")";
    }

    @Override
    public String getMethodName() {
        return "Card";
    }
}
