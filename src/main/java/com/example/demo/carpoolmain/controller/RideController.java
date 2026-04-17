package com.example.demo.carpoolmain.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;
import com.example.demo.carpoolmain.model.Ride;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/rides")
public class RideController {

  private static List<Ride> ridesList = new ArrayList<>();
  private static int rideIdCounter = 1;

  @GetMapping
  public ResponseEntity<Map<String, Object>> getRides() {
    Map<String, Object> response = new HashMap<>();
    List<Map<String, Object>> ridesData = new ArrayList<>();
    for (Ride ride : ridesList) {
      Map<String, Object> rideMap = new HashMap<>();
      rideMap.put("rideId", ride.getRideId());
      rideMap.put("source", ride.getSource());
      rideMap.put("destination", ride.getDestination());
      rideMap.put("availableSeats", ride.getAvailableSeats());
      rideMap.put("pricePerSeat", ride.getPricePerSeat());
      ridesData.add(rideMap);
    }
    response.put("success", true);
    response.put("message", "All rides fetched");
    response.put("data", ridesData);
    return ResponseEntity.ok(response);
  }

  @PostMapping
  public ResponseEntity<Map<String, Object>> createRide(@RequestBody Map<String, Object> rideData) {
    try {
      String source = (String) rideData.get("source");
      String destination = (String) rideData.get("destination");
      int seats = ((Number) rideData.get("availableSeats")).intValue();
      double pricePerSeat = rideData.get("pricePerSeat") != null ? ((Number) rideData.get("pricePerSeat")).doubleValue() : 50.0;

      Ride ride = new Ride(rideIdCounter++, source, destination, seats, pricePerSeat);
      ridesList.add(ride);

      Map<String, Object> response = new HashMap<>();
      response.put("success", true);
      response.put("message", "Ride created successfully");
      Map<String, Object> rideMap = new HashMap<>();
      rideMap.put("id", ride.getRideId());
      rideMap.put("rideId", ride.getRideId());
      rideMap.put("source", ride.getSource());
      rideMap.put("destination", ride.getDestination());
      rideMap.put("availableSeats", ride.getAvailableSeats());
      rideMap.put("pricePerSeat", ride.getPricePerSeat());
      response.put("data", rideMap);

      return ResponseEntity.ok(response);
    } catch (Exception e) {
      Map<String, Object> response = new HashMap<>();
      response.put("success", false);
      response.put("message", "Error creating ride: " + e.getMessage());
      return ResponseEntity.status(400).body(response);
    }
  }
}
