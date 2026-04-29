package com.example.demo.carpoolmain.state;

public class CancelledState implements RideState {
    @Override
    public void next(RideContext context) {
        System.out.println("Ride is CANCELLED. Cannot proceed.");
    }

    @Override
    public void cancel(RideContext context) {
        System.out.println("Ride already CANCELLED.");
    }

    @Override
    public String getStateName() { return "CANCELLED"; }
}
