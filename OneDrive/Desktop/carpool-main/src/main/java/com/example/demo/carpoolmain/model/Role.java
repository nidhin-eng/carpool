package com.example.demo.carpoolmain.model;
import jakarta.persistence.*;

@Entity
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @SuppressWarnings("unused")
    private String roleName; // ADMIN, DRIVER, PASSENGER

    // getters and setters
}