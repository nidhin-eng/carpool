package com.example.demo.carpoolmain.state;

public class OngoingState implements RideState {
    @Override
    public void next(RideContext context) {
        System.out.println("Ride finished. Moving to COMPLETED.");
        context.setState(new CompletedState());
    }

    @Override
    public void cancel(RideContext context) {
        System.out.println("Ride cancelled from ONGOING.");
        context.setState(new CancelledState());
    }

    @Override
    public String getStateName() { return "ONGOING"; }
}
