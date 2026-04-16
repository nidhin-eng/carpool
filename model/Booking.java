package model;

public class Booking {

  private int bookingId;
  private Ride ride;
  private int seats;
  private BookingStatus status;

  public Booking(int id, Ride ride, int seats) {
    this.bookingId = id;
    this.ride = ride;
    this.seats = seats;
    this.status = BookingStatus.PENDING;
  }

  public void confirm() {
    status = BookingStatus.CONFIRMED;
  }

  public void cancel() {
    status = BookingStatus.CANCELLED;
    ride.releaseSeats(seats);
  }

  public int getBookingId() {
    return bookingId;
  }
}
