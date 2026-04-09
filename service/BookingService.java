package service;

import model.*;

import java.util.HashMap;
import java.util.Map;

public class BookingService {

  private Map<Integer, Ride> rides = new HashMap<>();
  private Map<Integer, Booking> bookings = new HashMap<>();

  public void addRide(Ride ride) {
    rides.put(ride.getRideId(), ride);
  }

  public Booking createBooking(int rideId, int seats) {
    Ride ride = rides.get(rideId);

    if (!ride.hasSeats(seats)) {
      throw new RuntimeException("Seats not available");
    }

    ride.reserveSeats(seats);

    Booking booking = new Booking(bookings.size() + 1, ride, seats);
    bookings.put(booking.getBookingId(), booking);

    return booking;
  }

  public void viewRides() {
    for (Ride ride : rides.values()) {
      System.out.println(
          "Ride ID: " + ride.getRideId() +
              " | " + ride.getSource() + " → " + ride.getDestination() +
              " | Seats: " + ride.getAvailableSeats());
    }
  }
}
