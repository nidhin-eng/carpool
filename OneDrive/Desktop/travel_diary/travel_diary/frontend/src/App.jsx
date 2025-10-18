import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Landing from './pages/Landing/Landing';
import Why from './pages/Why.jsx';
import Reviews from './pages/Reviews.jsx';
import Contact from './pages/Contact.jsx';
import MainNavbar from './layouts/Main_Navbar/MainNavbar';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };


  const handleLogout = () => {
    setUser(null);
  };


  const RequireAuth = ({ children }) => {
    const location = useLocation();
    if (!user) {
      return <Navigate to="/" replace state={{ from: location }} />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
        <Route path="/why" element={<Why />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="/home"
          element={
            <RequireAuth>
              <MainNavbar onLogout={handleLogout} />
              <Home user={user} onLogout={handleLogout} currentUser={user} />
            </RequireAuth>
          }
        />


        <Route
          path="/profile"
          element={
            <RequireAuth>
              <MainNavbar onLogout={handleLogout} />
              <div>Profile Page</div>
            </RequireAuth>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
