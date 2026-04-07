package com.example.demo.carpoolmain.model;

public class UserRide {

  @SuppressWarnings("unused")
  private int id;
  @SuppressWarnings("unused")
  private User user;
  @SuppressWarnings("unused")
  private Ride ride;

  public UserRide(int id, User user, Ride ride) {
    this.id = id;
    this.user = user;
    this.ride = ride;
  }
}
