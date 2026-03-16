import React, { useState } from 'react';
import './Profile.css';

function Profile() {
  const [profile, setProfile] = useState({
    name: 'Ahmed Al-Rashidi',
    studentId: 'TII-20240138',
    major: 'Computer Engineering',
    email: 'ahmed.rashidi@tii.edu',
    phone: '+971 50 123 4567',
    year: '3rd Year',
    advisor: 'Dr. Sarah Mitchell',
    gpa: '3.72',
  });

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ ...profile });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    announcements: true,
    grades: true,
  });

  const handleSave = () => {
    setProfile(draft);
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft({ ...profile });
    setEditing(false);
  };

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="profile-page">
      <div className="page-header">
        <h2>Profile 👤</h2>
        <p>Manage your personal information and preferences</p>
      </div>

      <div className="profile-layout">
        {/* Profile Card */}
        <div className="profile-card card">
          <div className="profile-avatar-section">
            <div className="profile-avatar">AR</div>
            <h3>{profile.name}</h3>
            <span className="profile-id">{profile.studentId}</span>
            <div className="profile-badges">
              <span className="badge badge-info">{profile.year}</span>
              <span className="badge badge-success">Active</span>
            </div>
          </div>

          <div className="profile-stat-row">
            <div className="profile-stat">
              <span className="profile-stat-value">{profile.gpa}</span>
              <span className="profile-stat-label">GPA</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat-value">42</span>
              <span className="profile-stat-label">Credits</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat-value">6</span>
              <span className="profile-stat-label">Courses</span>
            </div>
          </div>
        </div>

        {/* Info & Settings */}
        <div className="profile-details">
          {/* Personal Info */}
          <div className="detail-section card">
            <div className="detail-section-header">
              <h3>Personal Information</h3>
              {!editing ? (
                <button className="btn-secondary" onClick={() => setEditing(true)}>✏️ Edit</button>
              ) : (
                <div className="edit-actions">
                  <button className="btn-primary" onClick={handleSave}>Save</button>
                  <button className="btn-secondary" onClick={handleCancel}>Cancel</button>
                </div>
              )}
            </div>

            <div className="detail-grid">
              <div className="detail-field">
                <label>Full Name</label>
                {editing ? (
                  <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
                ) : (
                  <span>{profile.name}</span>
                )}
              </div>
              <div className="detail-field">
                <label>Student ID</label>
                <span>{profile.studentId}</span>
              </div>
              <div className="detail-field">
                <label>Major</label>
                {editing ? (
                  <input value={draft.major} onChange={(e) => setDraft({ ...draft, major: e.target.value })} />
                ) : (
                  <span>{profile.major}</span>
                )}
              </div>
              <div className="detail-field">
                <label>Email</label>
                {editing ? (
                  <input type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
                ) : (
                  <span>{profile.email}</span>
                )}
              </div>
              <div className="detail-field">
                <label>Phone</label>
                {editing ? (
                  <input value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} />
                ) : (
                  <span>{profile.phone}</span>
                )}
              </div>
              <div className="detail-field">
                <label>Academic Advisor</label>
                <span>{profile.advisor}</span>
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
