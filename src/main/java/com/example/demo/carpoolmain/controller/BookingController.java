package com.example.demo.carpoolmain.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @GetMapping
    public String getBookings() {
        return "All bookings fetched";
    }

    @PostMapping
    public String createBooking() {
        return "Booking created successfully";
    }
}

