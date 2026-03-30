import React, { useState } from 'react';
import '../styles/AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/admin-login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('isAdmin', 'true');
        window.location.href = '/admin-dashboard';
      } else {
        setError('Invalid admin credentials');
      }
    } catch (error) {
      console.error('Admin login error:', error);
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-content">
        <div className="admin-login-card">
          {/* Header */}
          <div className="admin-header">
            <div className="admin-logo-icon">
              <svg viewBox="0 0 100 100" className="admin-logo-svg">
                <rect x="20" y="20" width="60" height="60" rx="5" fill="none" stroke="white" strokeWidth="3"/>
                <circle cx="50" cy="50" r="8" fill="white"/>
                <line x1="50" y1="30" x2="50" y2="20" stroke="white" strokeWidth="2"/>
                <line x1="70" y1="50" x2="80" y2="50" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
            <h1 className="admin-logo-text">ADMIN PANEL</h1>
            <p className="admin-header-subtitle">Fleet Dispatch Management</p>
          </div>

          {/* Error Message */}
          {error && <div className="error-message">{error}</div>}

          {/* Login Form */}
          <form onSubmit={handleAdminLogin} className="admin-login-form">
            {/* Username Input */}
            <div className="admin-form-group">
              <label htmlFor="admin-username" className="admin-form-label">Admin Username</label>
              <input
                type="text"
                id="admin-username"
                className="admin-form-input"
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="admin-form-group">
              <label htmlFor="admin-password" className="admin-form-label">Password</label>
              <div className="admin-password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="admin-password"
                  className="admin-form-input"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="admin-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg className="admin-eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="admin-btn admin-btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Authenticating...' : 'Access Admin Panel'}
            </button>

            {/* Back to User Login */}
            <button
              type="button"
              className="admin-btn admin-btn-back"
              onClick={() => window.location.href = '/'}
            >
              Back to User Login
            </button>
          </form>
        </div>

        {/* Right Side - Admin Section */}
        <div className="admin-info-section">
          <div className="admin-info-card">
            <h2>Welcome Back</h2>
            <p>Access your fleet management dashboard with administrative privileges.</p>
            <ul className="admin-features">
              <li>
                <span className="feature-icon">📊</span>
                Fleet Analytics
              </li>
              <li>
                <span className="feature-icon">👥</span>
                Driver Management
              </li>
              <li>
                <span className="feature-icon">🚚</span>
                Vehicle Tracking
              </li>
              <li>
                <span className="feature-icon">📱</span>
                Real-time Updates
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
