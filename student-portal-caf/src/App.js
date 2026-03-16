import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Library from './pages/Library';
import Cafeteria from './pages/Cafeteria';
import Profile from './pages/Profile';
import CampusMap from './pages/CampusMap';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <Router>
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
            <div className="sidebar-logo">T</div>
            <h1>TII <span>Portal</span></h1>
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
            <NavLink to="/profile" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeSidebar}>
              <span className="nav-icon">👤</span>
              Profile
            </NavLink>
          </nav>

          <div className="sidebar-footer">
            <div className="sidebar-user">
              <div className="sidebar-avatar">AS</div>
              <div className="sidebar-user-info">
                <div className="sidebar-user-name">Ahmed Student</div>
                <div className="sidebar-user-role">Undergraduate</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/cafeteria" element={<Cafeteria />} />
            <Route path="/campus-map" element={<CampusMap />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
