import React, { useState } from 'react';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // API call to your Django backend
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard';
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-card">
          {/* Logo and Header */}
          <div className="login-header">
            <div className="logo-container">
              <div className="logo-icon">
                <svg viewBox="0 0 100 100" className="logo-svg">
                  <circle cx="50" cy="30" r="8" fill="white"/>
                  <rect x="30" y="45" width="40" height="15" rx="3" fill="white" opacity="0.8"/>
                  <circle cx="40" cy="65" r="8" fill="white"/>
                  <circle cx="60" cy="65" r="8" fill="white"/>
                  <line x1="35" y1="50" x2="25" y2="40" stroke="white" strokeWidth="2"/>
                  <line x1="65" y1="50" x2="75" y2="40" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            <h1 className="logo-text">FLEET DISPATCH</h1>
            <p className="header-subtitle">Please enter your details</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="login-form">
            {/* Email Input */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="text"
                id="email"
                className="form-input"
                placeholder="Enter your email or username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg className="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="form-options">
              <label className="remember-checkbox">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember for 30 days</span>
              </label>
              <a href="#forgot" className="forgot-password">Forgot Password?</a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>

            {/* Admin Login Button */}
            <button
              type="button"
              className="btn btn-admin"
              onClick={() => window.location.href = '/admin-login'}
            >
              Log In as ADMIN
            </button>
          </form>
        </div>

        {/* Right Side - Car Image Section */}
        <div className="login-image-section">
          <div className="car-container">
            <div className="car-image">
              <img 
                src="/assets/images/car.png" 
                alt="Fleet Vehicle"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div class="placeholder-car">🚗 Vehicle Image</div>';
                }}
              />
            </div>
            <div className="logo-badge">
              <img 
                src="/assets/images/dap-logo.png" 
                alt="DAP Logo"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div class="placeholder-logo">DAP</div>';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
