package com.example.demo.carpoolmain.factory;

import com.example.demo.carpoolmain.model.Booking;
import com.example.demo.carpoolmain.model.Ride;

public class BookingFactory {

  public static Booking createBooking(Ride ride, String passengerName) {
    Booking booking = new Booking();
    booking.setRide(ride);
    booking.setPassengerName(passengerName);
    return booking;
  }
}
