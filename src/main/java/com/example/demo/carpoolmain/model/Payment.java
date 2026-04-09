package com.example.demo.carpoolmain.model;

public class Payment {

  @SuppressWarnings("unused")
  private int paymentId;
  @SuppressWarnings("unused")
  private double amount;

  public Payment(int id, double amount) {
    this.paymentId = id;
    this.amount = amount;
  }

  public double getAmount() {
    return amount;
  }
}
