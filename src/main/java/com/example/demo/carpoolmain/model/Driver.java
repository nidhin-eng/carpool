package com.example.demo.carpoolmain.model;

public class Driver extends User {

  public Driver(int id, String name) {
    super(id, name);
  }

  public Ride createRide(int rideId, String src, String dest, int seats) {
    return new Ride(rideId, src, dest, seats);
  }
}
