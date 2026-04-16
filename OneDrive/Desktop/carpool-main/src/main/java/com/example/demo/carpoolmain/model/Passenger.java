package com.example.demo.carpoolmain.model;

import jakarta.persistence.Entity;

@Entity
public class Passenger extends User {

  public Passenger() {}

  public Passenger(int id, String name) {
    this.setId((long) id);
    this.setName(name);
  }
}
