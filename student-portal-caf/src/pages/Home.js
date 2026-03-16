import React from 'react';
import './Home.css';

function Home() {
  const attendance = 87;

  const notifications = [
    {
      id: 1,
      type: 'reschedule',
      icon: '🔄',
      title: 'Data Structures — Class Rescheduled',
      body: 'Your Data Structures lecture on Wednesday, March 19 at 9:00 AM has been moved to Thursday, March 20 at 11:00 AM in Room 204.',
      time: '2 hours ago',
      badgeClass: 'badge-warning',
      badgeText: 'Rescheduled',
    },
    {
      id: 2,
      type: 'event',
      icon: '🎯',
      title: 'Tech Fest 2026 — This Saturday',
      body: 'The annual NMIMS Tech Fest is happening this Saturday, March 22. Hackathon registrations close on Friday. Don\'t miss out!',
      time: '5 hours ago',
      badgeClass: 'badge-info',
      badgeText: 'Event',
    },
    {
      id: 3,
      type: 'reschedule',
      icon: '🔄',
      title: 'Linear Algebra — Venue Changed',
      body: 'Linear Algebra class on Monday, March 17, will now be held in Lecture Hall B instead of Room 118.',
      time: '1 day ago',
      badgeClass: 'badge-warning',
      badgeText: 'Change',
    },
    {
      id: 4,
      type: 'event',
      icon: '🏆',
      title: 'Inter-College Sports Meet — March 25',
      body: 'Sports meet registrations are open. Events include cricket, badminton, table tennis, and athletics. Register at the sports office.',
      time: '2 days ago',
      badgeClass: 'badge-success',
      badgeText: 'Event',
    },
    {
      id: 5,
      type: 'alert',
      icon: '⚠️',
      title: 'Semester Fee Deadline — March 28',
      body: 'Last date for semester fee payment is March 28. Late submissions will attract a penalty. Visit the finance portal to pay.',
      time: '3 days ago',
      badgeClass: 'badge-danger',
      badgeText: 'Alert',
    },
  ];

  return (
    <div className="home-page">
      <div className="page-header">
        <h2>Welcome, Shaurya 👋</h2>
        <p>Here's your overview for today — Monday, March 17, 2026</p>
      </div>

      <div className="home-layout">
        {/* Student Card */}
        <div className="student-card card">
          <div className="student-photo-wrap">
            <img src="/student-avatar.png" alt="Shaurya Chabra" className="student-photo" />
          </div>
          <h3 className="student-name">Shaurya Chabra</h3>
          <span className="student-program">PGDM-MM — NMIMS</span>

          {/* Attendance Circle */}
          <div className="attendance-section">
            <div className="attendance-ring">
              <svg viewBox="0 0 120 120" className="attendance-svg">
                <circle
                  cx="60" cy="60" r="52"
                  fill="none"
                  stroke="var(--border-color)"
                  strokeWidth="8"
                />
                <circle
                  cx="60" cy="60" r="52"
                  fill="none"
                  stroke="var(--accent-primary)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(attendance / 100) * 327} 327`}
                  transform="rotate(-90 60 60)"
                  className="attendance-progress"
                />
              </svg>
              <div className="attendance-text">
                <span className="attendance-value">{attendance}%</span>
                <span className="attendance-label">Attendance</span>
              </div>
            </div>
            <p className="attendance-note">Semester Average</p>
          </div>
        </div>

        {/* Notifications */}
        <div className="notifications-section">
          <h3>Notifications & Alerts</h3>
          <div className="notifications-list">
            {notifications.map((n) => (
              <div className={`notification-card card`} key={n.id}>
                <div className="notification-icon-wrap">{n.icon}</div>
                <div className="notification-content">
                  <div className="notification-top">
                    <span className={`badge ${n.badgeClass}`}>{n.badgeText}</span>
                    <span className="notification-time">{n.time}</span>
                  </div>
                  <h4>{n.title}</h4>
                  <p>{n.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
