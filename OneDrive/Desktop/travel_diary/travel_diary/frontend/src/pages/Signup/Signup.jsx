import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import ParticleEffect from '../../components/ParticleEffect.jsx';
import password_icon from '../../assets/icon/lock-stroke-rounded.svg';
import email_icon from '../../assets/icon/mail-stroke-rounded.svg';
import profile_icon from '../../assets/icon/user-stroke-rounded.svg'

const Signup = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User created successfully:', data.user);
        onLogin(data.user);
        navigate('/home');
      } else {
        const data = await response.json();
        setError(data.msg || 'An error occurred during signup.');
      }
    } catch (err) {
      setError('An error occurred while signing up.');
    }
  };

  return (
    <div className='signup-main'>
      <ParticleEffect className="particle" />
      <div className="signup-container-wrapper">
        <div className="signup-container">
          <h1>Signup</h1>
          <form onSubmit={handleSignup}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <img className='signup-email-icon' src={email_icon} alt="email icon" />

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <img className='signup-profile-icon' src={profile_icon} alt="username icon" />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <img className='signup-password-icon-1' src={password_icon} alt="password icon" />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <img className='signup-password-icon-2' src={password_icon} alt="password icon" />
            <p>
              Hhave an account? <a href="/login">Login here</a>
            </p>
            <button className='signup-button' type="submit">Signup</button>
          </form>
          {error && <p className="signup-error-text">{error}</p>}
          {success && <p className="signup-success-text">{success}</p>}
        </div>
      </div>
    </div>
  );
};

export default Signup;
