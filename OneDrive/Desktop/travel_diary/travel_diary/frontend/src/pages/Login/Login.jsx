import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import ParticleEffect from '../../components/ParticleEffect.jsx';
import password_icon from '../../assets/icon/lock-stroke-rounded.svg';
import email_icon from '../../assets/icon/mail-stroke-rounded.svg';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // to handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Attempting login with:', email, password);
  
    try {
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log('Response from backend:', data);
  
      if (response.ok) {
        onLogin(data.user);
        navigate('/home');
      } else {
        setError(data.msg || 'Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error during login request:', error);
      setError('An error occurred. Please try again.');
    }
  };
  
  

  return (
    <div className='login-main'>
      <ParticleEffect className="particle" />
      <div className="login-container-wrapper">
        <div className='login-container'>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <img className='login-email-icon' src={email_icon} alt="email icon" />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <img className='login-password-icon' src={password_icon} alt="password icon" />
            </div>
            <p>
              Don't have an account? <a href="/signup">Sign up here</a>
            </p>
            {error && (
              <p style={{ color: 'red', fontSize: '14px' }}>
                {error}
              </p>
            )}
            <button className='login-button' type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
