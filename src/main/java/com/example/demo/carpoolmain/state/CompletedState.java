package com.example.demo.carpoolmain.state;

public class CompletedState implements RideState {
    @Override
    public void next(RideContext context) {
        System.out.println("Ride already COMPLETED. No further transitions.");
    }

    @Override
    public void cancel(RideContext context) {
        System.out.println("Cannot cancel a COMPLETED ride.");
    }

    @Override
    public String getStateName() { return "COMPLETED"; }
}
