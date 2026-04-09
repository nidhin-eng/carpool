package model;

public class UserRide {

  private int id;
  private User user;
  private Ride ride;

  public UserRide(int id, User user, Ride ride) {
    this.id = id;
    this.user = user;
    this.ride = ride;
  }
}
