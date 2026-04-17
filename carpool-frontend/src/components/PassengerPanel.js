import { useState } from 'react';
import PaymentModal from './PaymentModal';

export default function PassengerPanel({ onLogout, onLogin }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [rides, setRides] = useState([]);
  const [message, setMessage] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [payingBooking, setPayingBooking] = useState(null);

  const handleLogin = () => {
    if (!userId || !userName) { setMessage('Please enter User ID and Name'); return; }
    setLoggedIn(true);
    onLogin(userId, userName);
    setMessage('');
    fetchRides();
  };

  const fetchRides = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:9090/rides');
      const data = await response.json();
      setRides(data.success && Array.isArray(data.data) ? data.data : []);
      setMessage('✅ Rides loaded');
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      setMessage(`❌ Error loading rides: ${error.message}`);
    }
    setLoading(false);
  };

  const handleBookRide = async (rideId) => {
    const seatsToBook = prompt('How many seats do you need?', '1');
    if (!seatsToBook || isNaN(seatsToBook)) return;
    try {
      const response = await fetch('http://localhost:9090/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rideId, seats: parseInt(seatsToBook) }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        const booking = { ...data.data, seats: parseInt(seatsToBook), paymentStatus: "UNPAID", pricePerSeat: rides.find(r => r.rideId === rideId)?.pricePerSeat || 50 };
        setBookings(prev => [...prev, booking]);
        setMessage(`✅ Booking confirmed! Booking ID: ${booking.id}`);
        setRides(rides.map(ride =>
          ride.rideId === rideId ? { ...ride, availableSeats: ride.availableSeats - parseInt(seatsToBook) } : ride
        ));
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(`❌ ${data.message || 'Booking failed'}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  const handlePaymentSuccess = (method, amount) => {
    setBookings(prev => prev.map(b =>
      b.id === payingBooking.id ? { ...b, paymentStatus: 'PAID', paymentMethod: method, amount } : b
    ));
    setPayingBooking(null);
    setMessage(`✅ Payment of ₹${amount} via ${method} successful!`);
    setTimeout(() => setMessage(''), 3000);
  };

  if (!loggedIn) {
    return (
      <div className="panel">
        <h2>👥 Passenger Login</h2>
        {message && <div className="message error">{message}</div>}
        <div className="form-group">
          <label>User ID</label>
          <input type="number" value={userId} onChange={e => setUserId(e.target.value)} placeholder="Enter your ID" />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={userName} onChange={e => setUserName(e.target.value)} placeholder="Enter your name" />
        </div>
        <button className="btn btn-passenger" onClick={handleLogin}>Login as Passenger</button>
      </div>
    );
  }

  return (
    <div className="panel">
      {payingBooking && (
        <PaymentModal
          booking={payingBooking}
          onSuccess={handlePaymentSuccess}
          onClose={() => setPayingBooking(null)}
        />
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>👥 Passenger Dashboard</h2>
        <button className="btn btn-secondary" onClick={() => { setLoggedIn(false); onLogout(); }}>Logout</button>
      </div>

      {message && (
        <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</div>
      )}

      <div style={{ marginBottom: '20px' }}>
        <button className="btn btn-passenger" onClick={fetchRides} disabled={loading}>
          {loading ? 'Loading...' : '🔄 Refresh Rides'}
        </button>
      </div>

      <div className="card">
        <h3>Available Rides ({rides.length})</h3>
        {rides.length === 0 ? (
          <p style={{ color: '#999' }}>No rides available. Ask a driver to create one!</p>
        ) : (
          <div className="rides-list">
            {rides.map(ride => (
              <div key={ride.rideId} className="list-item">
                <h4>Ride #{ride.rideId}</h4>
                <div className="card-info">
                  <div className="info-item"><strong>From</strong><span>{ride.source}</span></div>
                  <div className="info-item"><strong>To</strong><span>{ride.destination}</span></div>
                  <div className="info-item"><strong>Available Seats</strong><span>{ride.availableSeats}</span></div>
                  <div className="info-item"><strong>Driver</strong><span>{ride.driverName || 'Unknown'}</span></div>
                  <div className="info-item"><strong>Price per Seat</strong><span>₹{ride.pricePerSeat || 50}</span></div>
                </div>
                <button
                  className="btn btn-passenger"
                  onClick={() => handleBookRide(ride.rideId)}
                  disabled={ride.availableSeats <= 0}
                >
                  {ride.availableSeats > 0 ? 'Book Ride' : 'No Seats Available'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {bookings.length > 0 && (
        <div className="card">
          <h3>Your Bookings ({bookings.length})</h3>
          <div className="bookings-list">
            {bookings.map(booking => (
              <div key={booking.id} className="list-item">
                <h4>Booking #{booking.id}</h4>
                <p>🚗 Ride ID: {booking.rideId}</p>
                <p>🪑 Seats: {booking.seats}</p>
                <p>💰 Amount: ₹{booking.pricePerSeat ? booking.seats * booking.pricePerSeat : booking.seats * 50}</p>
                <p>
                  💳 Payment:{' '}
                  <span style={{ color: booking.paymentStatus === 'PAID' ? 'green' : '#e67e00', fontWeight: 'bold' }}>
                    {booking.paymentStatus === 'PAID' ? `✅ PAID via ${booking.paymentMethod}` : '⏳ UNPAID'}
                  </span>
                </p>
                {booking.paymentStatus !== 'PAID' && (
                  <button
                    className="btn btn-driver"
                    style={{ marginTop: '8px' }}
                    onClick={() => setPayingBooking(booking)}
                  >
                    💳 Pay Now (₹{booking.pricePerSeat ? booking.seats * booking.pricePerSeat : booking.seats * 50})
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
