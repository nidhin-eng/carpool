import './App.css';
import { useState } from 'react';
import DriverPanel from './components/DriverPanel';
import PassengerPanel from './components/PassengerPanel';

function App() {
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');

  const handleRoleSelect = (role) => {
    setUserRole(role);
  };

  const handleUserLogin = (id, name) => {
    setUserId(id);
    setUserName(name);
  };

  const handleLogout = () => {
    setUserRole(null);
    setUserId('');
    setUserName('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚗 PES Carpool</h1>
        {userId && <p>Welcome, {userName}!</p>}
      </header>

      <div className="container">
        {!userRole ? (
          <div className="role-selection">
            <h2>Choose Your Role</h2>
            <div className="button-group">
              <button
                className="btn btn-driver"
                onClick={() => handleRoleSelect('driver')}
              >
                🚙 Driver
              </button>
              <button
                className="btn btn-passenger"
                onClick={() => handleRoleSelect('passenger')}
              >
                👥 Passenger
              </button>
            </div>
          </div>
        ) : userRole === 'driver' ? (
          <DriverPanel onLogout={handleLogout} onLogin={handleUserLogin} />
        ) : (
          <PassengerPanel onLogout={handleLogout} onLogin={handleUserLogin} />
        )}
      </div>
    </div>
  );
}

export default App;
