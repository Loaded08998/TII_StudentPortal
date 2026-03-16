import React, { useState } from 'react';
import './Profile.css';

function Profile() {
  const [profile] = useState({
    name: 'Shaurya Chabra',
    studentId: '7722983672',
    program: 'PGDM-MM',
    institute: 'NMIMS Global Access School for Continuing Education',
    dob: '12/07/1998',
    batch: 'Jan 2020',
    contact: '9329544274',
    bloodGroup: 'AB+',
    email: 'shaurya.chabra@nmims.edu',
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    announcements: true,
    grades: true,
  });

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="profile-page">
      <div className="page-header">
        <h2>My Profile 👤</h2>
        <p>Your personal information and preferences</p>
      </div>

      <div className="profile-layout">
        {/* Profile Card */}
        <div className="profile-card card">
          <div className="profile-avatar-section">
            <div className="profile-avatar-img-wrap">
              <img src="/student-avatar.png" alt="Shaurya Chabra" className="profile-avatar-photo" />
            </div>
            <h3>{profile.name}</h3>
            <span className="profile-program">{profile.program}</span>
            <span className="profile-institute">{profile.institute}</span>
            <div className="profile-badges">
              <span className="badge badge-info">{profile.batch}</span>
              <span className="badge badge-success">Active</span>
            </div>
          </div>

          <div className="profile-id-card">
            <div className="id-card-header">
              <img src="/nmims-logo.png" alt="NMIMS" className="id-card-logo" />
              <span>Student ID</span>
            </div>
            <div className="id-card-number">{profile.studentId}</div>
          </div>
        </div>

        {/* Info & Settings */}
        <div className="profile-details">
          {/* Personal Info */}
          <div className="detail-section card">
            <div className="detail-section-header">
              <h3>Personal Information</h3>
            </div>

            <div className="detail-grid">
              <div className="detail-field">
                <label>Full Name</label>
                <span>{profile.name}</span>
              </div>
              <div className="detail-field">
                <label>Student ID</label>
                <span>{profile.studentId}</span>
              </div>
              <div className="detail-field">
                <label>Program</label>
                <span>{profile.program}</span>
              </div>
              <div className="detail-field">
                <label>Institute</label>
                <span>{profile.institute}</span>
              </div>
              <div className="detail-field">
                <label>Date of Birth</label>
                <span>{profile.dob}</span>
              </div>
              <div className="detail-field">
                <label>Batch</label>
                <span>{profile.batch}</span>
              </div>
              <div className="detail-field">
                <label>Contact</label>
                <span>{profile.contact}</span>
              </div>
              <div className="detail-field">
                <label>Email</label>
                <span>{profile.email}</span>
              </div>
              <div className="detail-field">
                <label>Blood Group</label>
                <span className="blood-group-badge">{profile.bloodGroup}</span>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="detail-section card">
            <div className="detail-section-header">
              <h3>Notification Preferences</h3>
            </div>
            <div className="notification-list">
              {Object.entries(notifications).map(([key, value]) => (
                <div className="notification-row" key={key}>
                  <div className="notification-info">
                    <span className="notification-label">{key.charAt(0).toUpperCase() + key.slice(1)} Notifications</span>
                    <span className="notification-desc">Receive {key} notifications about updates</span>
                  </div>
                  <button
                    className={`toggle-switch ${value ? 'active' : ''}`}
                    onClick={() => toggleNotification(key)}
                    aria-label={`Toggle ${key} notifications`}
                  >
                    <span className="toggle-knob" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
