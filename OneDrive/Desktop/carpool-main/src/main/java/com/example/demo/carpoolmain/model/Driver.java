package com.example.demo.carpoolmain.model;

import jakarta.persistence.Entity;

@Entity
public class Driver extends User {
  private String vehicle;

  public Driver() {}

  public Driver(int id, String name) {
    this.setId((long) id);
    this.setName(name);
  }

  public String getVehicle() {
    return vehicle;
  }

  public void setVehicle(String vehicle) {
    this.vehicle = vehicle;
  }

  public Ride createRide(int rideId, String source, String destination, int seats) {
    return new Ride(rideId, source, destination, seats);
  }
}
