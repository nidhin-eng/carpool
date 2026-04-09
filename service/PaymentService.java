package service;

import model.Payment;

public class PaymentService {

    public Payment createPayment(int id, double amount) {
        return new Payment(id, amount);
    }
}
