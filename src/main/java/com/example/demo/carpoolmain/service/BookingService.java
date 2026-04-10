package com.example.demo.carpoolmain.service;

import org.springframework.stereotype.Service;
import com.example.demo.carpoolmain.model.Booking;
import com.example.demo.carpoolmain.model.Ride;
import com.example.demo.carpoolmain.factory.BookingFactory;

@Service
public class BookingService {

  public Booking createBooking(Ride ride, String passengerName) {
    return BookingFactory.createBooking(ride, passengerName);
  }
}
