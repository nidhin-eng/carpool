package com.example.demo.carpoolmain.model;

public class Ride {

  private int rideId;
  private String source;
  private String destination;
  private int availableSeats;
  private double pricePerSeat;
  private RideStatus status;

  public Ride(int id, String source, String destination, int seats, double pricePerSeat) {
    this.rideId = id;
    this.source = source;
    this.destination = destination;
    this.availableSeats = seats;
    this.pricePerSeat = pricePerSeat;
    this.status = RideStatus.SCHEDULED;
  }

  public boolean hasSeats(int seats) {
    return availableSeats >= seats;
  }

  public void reserveSeats(int seats) {
    if (!hasSeats(seats)) {
      throw new RuntimeException("Not enough seats");
    }
    availableSeats -= seats;
  }

  public void releaseSeats(int seats) {
    availableSeats += seats;
  }

  public int getRideId() { return rideId; }
  public int getAvailableSeats() { return availableSeats; }
  public String getSource() { return source; }
  public String getDestination() { return destination; }
  public double getPricePerSeat() { return pricePerSeat; }
}