import { useState } from 'react';

export default function BookingForm({ rideId, onSubmit }) {
  const [seats, setSeats] = useState('1');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (seats && parseInt(seats) > 0) {
      onSubmit(parseInt(seats));
      setSeats('1');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <div className="form-group">
        <label>Number of Seats</label>
        <input
          type="number"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
          min="1"
          max="8"
        />
      </div>
      <button type="submit" className="btn btn-passenger">
        Confirm Booking
      </button>
    </form>
  );
}
