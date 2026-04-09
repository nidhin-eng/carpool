package com.example.demo.carpoolmain;

import com.example.demo.carpoolmain.model.*;
import com.example.demo.carpoolmain.service.*;

import java.util.*;

public class Main {

  static Scanner sc = new Scanner(System.in);

  static Map<Integer, User> users = new HashMap<>();
  static BookingService bookingService = new BookingService();

  static int userIdCounter = 1;
  static int rideIdCounter = 1;

  public static void main(String[] args) {

    while (true) {
      System.out.println("\n==== PES CARPOOL ====");
      System.out.println("1. Enter as Driver");
      System.out.println("2. Enter as Passenger");
      System.out.println("3. Register New User");
      System.out.println("4. Exit");
      System.out.print("Choose option: ");

      int choice = sc.nextInt();
      sc.nextLine();

      switch (choice) {
        case 1 -> driverFlow();
        case 2 -> passengerFlow();
        case 3 -> registerUser();
        case 4 -> {
          System.out.println("Exiting...");
          return;
        }
        default -> System.out.println("Invalid choice");
      }
    }
  }

  // ---------------- USER REGISTRATION ----------------

  static void registerUser() {
    System.out.print("Enter name: ");
    String name = sc.nextLine();

    System.out.print("Are you Driver or Passenger? (d/p): ");
    String type = sc.nextLine();

    User user;

    if (type.equalsIgnoreCase("d")) {
      user = new Driver(userIdCounter, name);
    } else {
      user = new Passenger(userIdCounter, name);
    }

    users.put(userIdCounter, user);
    System.out.println("User registered with ID: " + userIdCounter);
    userIdCounter++;
  }

  // ---------------- DRIVER FLOW ----------------

  static void driverFlow() {
    System.out.print("Enter your User ID: ");
    int id = sc.nextInt();
    sc.nextLine();

    User user = users.get(id);

    if (!(user instanceof Driver driver)) {
      System.out.println("Invalid driver!");
      return;
    }

    System.out.print("Enter Source: ");
    String src = sc.nextLine();

    System.out.print("Enter Destination: ");
    String dest = sc.nextLine();

    System.out.print("Enter Seats: ");
    int seats = sc.nextInt();

    Ride ride = driver.createRide(rideIdCounter, src, dest, seats);
    bookingService.addRide(ride);

    System.out.println("Ride created with ID: " + rideIdCounter);
    rideIdCounter++;
  }

  // ---------------- PASSENGER FLOW ----------------

  static void passengerFlow() {
    System.out.print("Enter your User ID: ");
    int id = sc.nextInt();
    sc.nextLine();

    User user = users.get(id);

    if (!(user instanceof Passenger)) {
      System.out.println("Invalid passenger!");
      return;
    }

    System.out.println("\nAvailable Rides:");
    bookingService.viewRides(); // 👈 THIS is all you need

    System.out.print("Enter Ride ID: ");
    int rideId = sc.nextInt();

    System.out.print("Enter seats to book: ");
    int seats = sc.nextInt();

    try {
      Booking booking = bookingService.createBooking(rideId, seats);
      System.out.println("Booking successful! ID: " + booking.getBookingId());
    } catch (Exception e) {
      System.out.println("Booking failed: " + e.getMessage());
    }
  }
}
