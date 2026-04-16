export default function RidesList({ rides, onBook }) {
  if (rides.length === 0) {
    return <p style={{ textAlign: 'center', color: '#999' }}>No rides available</p>;
  }

  return (
    <div className="rides-list">
      {rides.map((ride) => (
        <div key={ride.id} className="list-item">
          <h4>Ride #{ride.id}</h4>
          <div className="card-info">
            <div className="info-item">
              <strong>From:</strong> {ride.source}
            </div>
            <div className="info-item">
              <strong>To:</strong> {ride.destination}
            </div>
            <div className="info-item">
              <strong>Seats:</strong> {ride.availableSeats}
            </div>
            <div className="info-item">
              <strong>Driver:</strong> {ride.driverName || 'N/A'}
            </div>
          </div>
          {onBook && (
            <button
              className="btn btn-passenger"
              onClick={() => onBook(ride.id)}
              disabled={ride.availableSeats <= 0}
            >
              {ride.availableSeats > 0 ? 'Book Now' : 'No Seats'}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
