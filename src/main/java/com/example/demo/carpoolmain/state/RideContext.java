package com.example.demo.carpoolmain.state;

public class RideContext {

    private RideState currentState;

    public RideContext() {
        this.currentState = new ScheduledState();
    }

    public void setState(RideState state) {
        this.currentState = state;
    }

    public void next() {
        currentState.next(this);
    }

    public void cancel() {
        currentState.cancel(this);
    }

    public String getCurrentStateName() {
        return currentState.getStateName();
    }
}
