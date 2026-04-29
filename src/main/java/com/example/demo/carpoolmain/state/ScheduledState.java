package com.example.demo.carpoolmain.state;

public class ScheduledState implements RideState {
    @Override
    public void next(RideContext context) {
        System.out.println("Ride started. Moving to ONGOING.");
        context.setState(new OngoingState());
    }

    @Override
    public void cancel(RideContext context) {
        System.out.println("Ride cancelled from SCHEDULED.");
        context.setState(new CancelledState());
    }

    @Override
    public String getStateName() { return "SCHEDULED"; }
}
