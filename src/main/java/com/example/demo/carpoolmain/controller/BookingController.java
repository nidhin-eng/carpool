package com.example.demo.carpoolmain.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;
import com.example.demo.carpoolmain.model.Booking;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/bookings")
public class BookingController {

    private static List<Booking> bookingsList = new ArrayList<>();
    private static int bookingIdCounter = 1;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getBookings() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "All bookings fetched");
        response.put("data", bookingsList);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createBooking(@RequestBody Map<String, Object> bookingData) {
        try {
            // Log the incoming data for debugging
            System.out.println("Booking data received: " + bookingData);
            
            Object rideIdObj = bookingData.get("rideId");
            Object seatsObj = bookingData.get("seats");
            
            if (rideIdObj == null || seatsObj == null) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Missing required fields: rideId=" + rideIdObj + ", seats=" + seatsObj);
                return ResponseEntity.status(400).body(response);
            }
            
            int rideId = ((Number) rideIdObj).intValue();
            int seats = ((Number) seatsObj).intValue();
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Booking created successfully");
            Map<String, Object> bookingMap = new HashMap<>();
            bookingMap.put("id", bookingIdCounter++);
            bookingMap.put("rideId", rideId);
            bookingMap.put("seats", seats);
            response.put("data", bookingMap);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error creating booking: " + e.getMessage());
            return ResponseEntity.status(400).body(response);
        }
    }
}

