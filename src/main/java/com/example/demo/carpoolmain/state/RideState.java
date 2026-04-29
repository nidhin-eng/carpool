package com.example.demo.carpoolmain.state;

public interface RideState {
    void next(RideContext context);
    void cancel(RideContext context);
    String getStateName();
}
