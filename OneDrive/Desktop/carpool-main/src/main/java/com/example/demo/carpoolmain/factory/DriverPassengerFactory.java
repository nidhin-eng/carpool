package com.example.demo.carpoolmain.factory;

import com.example.demo.carpoolmain.model.Driver;
import com.example.demo.carpoolmain.model.Passenger;

public class DriverPassengerFactory {

  public static Driver createDriver(String name, String vehicle) {
    Driver d = new Driver();
    d.setName(name);
    d.setVehicle(vehicle);
    return d;
  }

  public static Passenger createPassenger(String name) {
    Passenger p = new Passenger();
    p.setName(name);
    return p;
  }
}