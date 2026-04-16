import { useState } from 'react';
import RidesList from './RidesList';

export default function DriverPanel({ onLogout, onLogin }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [seats, setSeats] = useState('');
  const [message, setMessage] = useState('');
  const [rides, setRides] = useState([]);

  const handleLogin = () => {
    if (!userId || !userName) {
      setMessage('Please enter User ID and Name');
      return;
    }
    setLoggedIn(true);
    onLogin(userId, userName);
    setMessage('');
  };

  const handleCreateRide = async (e) => {
    e.preventDefault();
    
    if (!source || !destination || !seats) {
      setMessage('Please fill all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:9090/rides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source,
          destination,
          availableSeats: parseInt(seats),
          driverId: userId,
          driverName: userName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const newRide = data.data;
          setRides([...rides, newRide]);
          setMessage(`✅ Ride created successfully with ID: ${newRide.id}`);
          setSource('');
          setDestination('');
          setSeats('');
          setTimeout(() => setMessage(''), 3000);
        } else {
          setMessage(`❌ ${data.message}`);
        }
      } else {
        setMessage('❌ Failed to create ride');
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  if (!loggedIn) {
    return (
      <div className="panel">
        <h2>🚗 Driver Login</h2>
        {message && <div className="message error">{message}</div>}
        <div className="form-group">
          <label>User ID</label>
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter your ID"
          />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <button className="btn btn-driver" onClick={handleLogin}>
          Login as Driver
        </button>
      </div>
    );
  }

  return (
    <div className="panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>🚗 Driver Dashboard</h2>
        <button className="btn btn-secondary" onClick={() => {
          setLoggedIn(false);
          onLogout();
        }}>
          Logout
        </button>
      </div>

      {message && (
        <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="card">
        <h3>Create a New Ride</h3>
        <form onSubmit={handleCreateRide}>
          <div className="form-group">
            <label>Source</label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="e.g., PES Campus"
            />
          </div>
          <div className="form-group">
            <label>Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g., Airport"
            />
          </div>
          <div className="form-group">
            <label>Available Seats</label>
            <input
              type="number"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              placeholder="e.g., 4"
              min="1"
              max="8"
            />
          </div>
          <button type="submit" className="btn btn-driver">
            Create Ride
          </button>
        </form>
      </div>

      {rides.length > 0 && (
        <div className="rides-list">
          <h3>Your Rides</h3>
          {rides.map((ride) => (
            <div key={ride.id} className="list-item">
              <h4>Ride #{ride.id}</h4>
              <p>📍 From: {ride.source}</p>
              <p>📍 To: {ride.destination}</p>
              <p>🪑 Seats: {ride.availableSeats}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
