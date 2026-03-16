import React from 'react';
import './Home.css';

function Home() {
  const stats = [
    { label: 'Current GPA', value: '3.72', icon: '📊', gradient: 'gradient-primary' },
    { label: 'Upcoming Classes', value: '3', icon: '📅', gradient: 'gradient-secondary' },
    { label: 'Library Dues', value: '$0.00', icon: '📖', gradient: 'gradient-success' },
    { label: 'Cafeteria Balance', value: '$45.50', icon: '💳', gradient: 'gradient-warm' },
  ];

  const announcements = [
    {
      id: 1,
      title: 'Spring Break Schedule',
      date: 'Mar 15, 2026',
      body: 'Campus facilities will operate on reduced hours from March 20–28. The library closes at 5 PM and the cafeteria at 3 PM.',
      badge: 'Important',
      badgeClass: 'badge-warning',
    },
    {
      id: 2,
      title: 'New Books Added to Library',
      date: 'Mar 14, 2026',
      body: 'Over 200 new titles have been added to the engineering and sciences sections. Check them out today!',
      badge: 'New',
      badgeClass: 'badge-info',
    },
    {
      id: 3,
      title: 'Cafeteria Menu Update',
      date: 'Mar 12, 2026',
      body: 'We\'ve added new healthy meal options including vegan bowls and fresh smoothies. Available starting next Monday.',
      badge: 'Update',
      badgeClass: 'badge-success',
    },
  ];

  const schedule = [
    { time: '09:00 AM', course: 'Data Structures', room: 'Room 204', color: 'var(--accent-primary)' },
    { time: '11:00 AM', course: 'Linear Algebra', room: 'Room 118', color: 'var(--accent-secondary)' },
    { time: '02:00 PM', course: 'Digital Electronics', room: 'Lab 3B', color: 'var(--accent-warning)' },
  ];

  return (
    <div className="home-page">
      <div className="page-header">
        <h2>Welcome back, Ahmed 👋</h2>
        <p>Here's what's happening today — Monday, March 17, 2026</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div className={`stat-card card ${stat.gradient}`} key={idx}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Content Row */}
      <div className="home-content-row">
        {/* Today's Schedule */}
        <div className="schedule-section">
          <h3>Today's Schedule</h3>
          <div className="schedule-list">
            {schedule.map((item, idx) => (
              <div className="schedule-item card" key={idx}>
                <div className="schedule-accent" style={{ background: item.color }} />
                <div className="schedule-time">{item.time}</div>
                <div className="schedule-details">
                  <span className="schedule-course">{item.course}</span>
                  <span className="schedule-room">{item.room}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div className="announcements-section">
          <h3>Announcements</h3>
          <div className="announcements-list">
            {announcements.map((a) => (
              <div className="announcement-item card" key={a.id}>
                <div className="announcement-header">
                  <span className={`badge ${a.badgeClass}`}>{a.badge}</span>
                  <span className="announcement-date">{a.date}</span>
                </div>
                <h4>{a.title}</h4>
                <p>{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
