package com.example.demo.carpoolmain.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rides")
public class RideController {

  @GetMapping
  public String getRides() {
    return "All rides fetched";
  }

  @PostMapping
  public String createRide() {
    return "Ride created successfully";
  }
}
