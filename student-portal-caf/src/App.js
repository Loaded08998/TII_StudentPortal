import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Library from './pages/Library';
import Cafeteria from './pages/Cafeteria';
import Profile from './pages/Profile';
import CampusMap from './pages/CampusMap';
import Login from './pages/Login'; // importing the new Login page
import Attendance from './pages/Attendance';

function AppContent({ isAuthenticated, setIsAuthenticated }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to login if not authenticated
  if (!isAuthenticated && location.pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }

  // Hide the sidebar and topbar if on the login page
  if (location.pathname === '/login') {
    return (
      <Routes>
        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const isProfileActive = location.pathname === '/profile';

  const handleProfileClick = () => {
    navigate('/profile');
    closeSidebar();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
    closeSidebar();
  };

  return (
    <div className="app-layout">
      {/* Mobile Toggle */}
      <button className="mobile-toggle" onClick={toggleSidebar} aria-label="Toggle menu">
        ☰
      </button>

      {/* Sidebar Overlay (mobile) */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'show' : ''}`}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="sidebar-logo-icon">
            <img src="/nmims-logo.png" alt="NMIMS" className="sidebar-logo-img" />
          </div>
          <h1><span>NMIMS</span> Portal</h1>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/home" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeSidebar}>
            <span className="nav-icon">🏠</span>
            Home
          </NavLink>
          <NavLink to="/library" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeSidebar}>
            <span className="nav-icon">📚</span>
            Library
          </NavLink>
          <NavLink to="/cafeteria" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeSidebar}>
            <span className="nav-icon">🍽️</span>
            Cafeteria
          </NavLink>
          <NavLink to="/campus-map" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeSidebar}>
            <span className="nav-icon">🗺️</span>
            Campus Map
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <button
            className={`sidebar-user-btn ${isProfileActive ? 'active' : ''}`}
            onClick={handleProfileClick}
            title="View Profile"
          >
            <div className="sidebar-avatar-img-wrap">
              <img src="/student-avatar.png" alt="Student" className="sidebar-avatar-photo" />
            </div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">Shaurya Chabra</div>
              <div className="sidebar-user-role">PGDM-MM</div>
            </div>
            <span className="sidebar-profile-arrow">›</span>
          </button>
          
          <button className="sidebar-logout-btn" onClick={handleLogout} title="Log Out">
            <span className="nav-icon">🚪</span>
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar with Logo */}
        <div className="top-bar">
          <div className="top-bar-spacer" />
          <img src="/nmims-logo.png" alt="NMIMS University" className="top-bar-logo" />
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/cafeteria" element={<Cafeteria />} />
          <Route path="/campus-map" element={<CampusMap />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <AppContent isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
    </Router>
  );
}

export default App;
