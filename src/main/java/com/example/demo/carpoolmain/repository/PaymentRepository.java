package com.example.demo.carpoolmain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.carpoolmain.model.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}