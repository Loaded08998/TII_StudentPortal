import React, { useState } from 'react';
import './CampusMap.css';

const floors = [
  { id: 'ground', label: 'Ground Floor' },
  { id: '1st', label: '1st Floor' },
  { id: '2nd', label: '2nd Floor' },
  { id: '3rd', label: '3rd Floor' },
];

const floorDetails = {
  ground: {
    title: 'Ground Floor',
    description: 'Main entrance, reception, cafeteria, student services, and security office.',
    rooms: ['Main Lobby', 'Cafeteria', 'Student Services', 'Security Office', 'Parking Access'],
  },
  '1st': {
    title: '1st Floor',
    description: 'Lecture halls, seminar rooms, and the central library.',
    rooms: ['Lecture Hall A', 'Lecture Hall B', 'Seminar Room 101–104', 'Library', 'Faculty Offices'],
  },
  '2nd': {
    title: '2nd Floor',
    description: 'Engineering labs, computer labs, and research centers.',
    rooms: ['Computer Lab 1', 'Computer Lab 2', 'Electronics Lab', 'Research Center', 'Study Rooms 201–206'],
  },
  '3rd': {
    title: '3rd Floor',
    description: 'Administration offices, conference rooms, and the rooftop terrace.',
    rooms: ['Admin Office', 'Conference Room A', 'Conference Room B', 'Dean\'s Office', 'Rooftop Terrace Access'],
  },
};

function CampusMap() {
  const [activeFloor, setActiveFloor] = useState('ground');
  const info = floorDetails[activeFloor];

  return (
    <div className="campus-map-page">
      <div className="page-header">
        <h2>Campus Map 🗺️</h2>
        <p>TII Innovation Building — Select a floor to view its layout</p>
      </div>

      {/* Floor Selector */}
      <div className="floor-selector">
        {floors.map((floor) => (
          <button
            key={floor.id}
            className={`floor-btn ${activeFloor === floor.id ? 'active' : ''}`}
            onClick={() => setActiveFloor(floor.id)}
          >
            {floor.label}
          </button>
        ))}
      </div>

      {/* Map Display */}
      <div className="map-container card">
        <div className="map-visual">
          <FloorPlanSVG floor={activeFloor} />
        </div>
        <div className="map-info">
          <h3>{info.title}</h3>
          <p className="map-desc">{info.description}</p>
          <div className="room-list">
            <h4>Key Locations</h4>
            <ul>
              {info.rooms.map((room, idx) => (
                <li key={idx}>
                  <span className="room-dot" />
                  {room}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Inline SVG floor plans — each floor has a unique layout */
function FloorPlanSVG({ floor }) {
  const commonStyle = {
    width: '100%',
    height: '100%',
  };

  const plans = {
    ground: (
      <svg viewBox="0 0 600 400" style={commonStyle} xmlns="http://www.w3.org/2000/svg">
        {/* Building outline */}
        <rect x="50" y="40" width="500" height="320" rx="8" fill="none" stroke="#6c5ce7" strokeWidth="2" opacity="0.6" />
        {/* Rooms */}
        <rect x="60" y="50" width="200" height="140" rx="6" fill="rgba(108,92,231,0.08)" stroke="#6c5ce7" strokeWidth="1" opacity="0.5" />
        <text x="160" y="125" textAnchor="middle" fill="#a29bfe" fontSize="13" fontWeight="600">Main Lobby</text>
        <rect x="280" y="50" width="260" height="140" rx="6" fill="rgba(0,206,201,0.08)" stroke="#00cec9" strokeWidth="1" opacity="0.5" />
        <text x="410" y="125" textAnchor="middle" fill="#81ecec" fontSize="13" fontWeight="600">Cafeteria</text>
        <rect x="60" y="210" width="150" height="140" rx="6" fill="rgba(253,203,110,0.08)" stroke="#fdcb6e" strokeWidth="1" opacity="0.5" />
        <text x="135" y="285" textAnchor="middle" fill="#fdcb6e" fontSize="12" fontWeight="600">Student Services</text>
        <rect x="230" y="210" width="140" height="140" rx="6" fill="rgba(225,112,85,0.08)" stroke="#e17055" strokeWidth="1" opacity="0.5" />
        <text x="300" y="285" textAnchor="middle" fill="#e17055" fontSize="12" fontWeight="600">Security</text>
        <rect x="390" y="210" width="150" height="140" rx="6" fill="rgba(0,184,148,0.08)" stroke="#00b894" strokeWidth="1" opacity="0.5" />
        <text x="465" y="285" textAnchor="middle" fill="#00b894" fontSize="12" fontWeight="600">Parking Access</text>
        {/* Entrance */}
        <rect x="130" y="348" width="60" height="14" rx="3" fill="#6c5ce7" opacity="0.7" />
        <text x="160" y="358" textAnchor="middle" fill="white" fontSize="8" fontWeight="600">ENTRANCE</text>
      </svg>
    ),
    '1st': (
      <svg viewBox="0 0 600 400" style={commonStyle} xmlns="http://www.w3.org/2000/svg">
        <rect x="50" y="40" width="500" height="320" rx="8" fill="none" stroke="#6c5ce7" strokeWidth="2" opacity="0.6" />
        <rect x="60" y="50" width="230" height="120" rx="6" fill="rgba(108,92,231,0.08)" stroke="#6c5ce7" strokeWidth="1" opacity="0.5" />
        <text x="175" y="115" textAnchor="middle" fill="#a29bfe" fontSize="13" fontWeight="600">Lecture Hall A</text>
        <rect x="310" y="50" width="230" height="120" rx="6" fill="rgba(0,206,201,0.08)" stroke="#00cec9" strokeWidth="1" opacity="0.5" />
        <text x="425" y="115" textAnchor="middle" fill="#81ecec" fontSize="13" fontWeight="600">Lecture Hall B</text>
        <rect x="60" y="190" width="320" height="160" rx="6" fill="rgba(253,203,110,0.08)" stroke="#fdcb6e" strokeWidth="1" opacity="0.5" />
        <text x="220" y="275" textAnchor="middle" fill="#fdcb6e" fontSize="14" fontWeight="600">📚 Library</text>
        <rect x="400" y="190" width="140" height="75" rx="6" fill="rgba(225,112,85,0.08)" stroke="#e17055" strokeWidth="1" opacity="0.5" />
        <text x="470" y="232" textAnchor="middle" fill="#e17055" fontSize="11" fontWeight="600">Seminar 101-102</text>
        <rect x="400" y="275" width="140" height="75" rx="6" fill="rgba(0,184,148,0.08)" stroke="#00b894" strokeWidth="1" opacity="0.5" />
        <text x="470" y="317" textAnchor="middle" fill="#00b894" fontSize="11" fontWeight="600">Seminar 103-104</text>
      </svg>
    ),
    '2nd': (
      <svg viewBox="0 0 600 400" style={commonStyle} xmlns="http://www.w3.org/2000/svg">
        <rect x="50" y="40" width="500" height="320" rx="8" fill="none" stroke="#6c5ce7" strokeWidth="2" opacity="0.6" />
        <rect x="60" y="50" width="230" height="140" rx="6" fill="rgba(108,92,231,0.08)" stroke="#6c5ce7" strokeWidth="1" opacity="0.5" />
        <text x="175" y="125" textAnchor="middle" fill="#a29bfe" fontSize="13" fontWeight="600">💻 Computer Lab 1</text>
        <rect x="310" y="50" width="230" height="140" rx="6" fill="rgba(0,206,201,0.08)" stroke="#00cec9" strokeWidth="1" opacity="0.5" />
        <text x="425" y="125" textAnchor="middle" fill="#81ecec" fontSize="13" fontWeight="600">💻 Computer Lab 2</text>
        <rect x="60" y="210" width="180" height="140" rx="6" fill="rgba(253,203,110,0.08)" stroke="#fdcb6e" strokeWidth="1" opacity="0.5" />
        <text x="150" y="285" textAnchor="middle" fill="#fdcb6e" fontSize="12" fontWeight="600">Electronics Lab</text>
        <rect x="260" y="210" width="160" height="140" rx="6" fill="rgba(225,112,85,0.08)" stroke="#e17055" strokeWidth="1" opacity="0.5" />
        <text x="340" y="285" textAnchor="middle" fill="#e17055" fontSize="12" fontWeight="600">Research Center</text>
        <rect x="440" y="210" width="100" height="65" rx="6" fill="rgba(0,184,148,0.08)" stroke="#00b894" strokeWidth="1" opacity="0.5" />
        <text x="490" y="247" textAnchor="middle" fill="#00b894" fontSize="10" fontWeight="600">Study 201-203</text>
        <rect x="440" y="285" width="100" height="65" rx="6" fill="rgba(0,184,148,0.08)" stroke="#00b894" strokeWidth="1" opacity="0.5" />
        <text x="490" y="322" textAnchor="middle" fill="#00b894" fontSize="10" fontWeight="600">Study 204-206</text>
      </svg>
    ),
    '3rd': (
      <svg viewBox="0 0 600 400" style={commonStyle} xmlns="http://www.w3.org/2000/svg">
        <rect x="50" y="40" width="500" height="320" rx="8" fill="none" stroke="#6c5ce7" strokeWidth="2" opacity="0.6" />
        <rect x="60" y="50" width="320" height="140" rx="6" fill="rgba(108,92,231,0.08)" stroke="#6c5ce7" strokeWidth="1" opacity="0.5" />
        <text x="220" y="125" textAnchor="middle" fill="#a29bfe" fontSize="13" fontWeight="600">Admin Office</text>
        <rect x="400" y="50" width="140" height="140" rx="6" fill="rgba(253,203,110,0.08)" stroke="#fdcb6e" strokeWidth="1" opacity="0.5" />
        <text x="470" y="125" textAnchor="middle" fill="#fdcb6e" fontSize="12" fontWeight="600">Dean's Office</text>
        <rect x="60" y="210" width="200" height="140" rx="6" fill="rgba(0,206,201,0.08)" stroke="#00cec9" strokeWidth="1" opacity="0.5" />
        <text x="160" y="285" textAnchor="middle" fill="#81ecec" fontSize="12" fontWeight="600">Conference Room A</text>
        <rect x="280" y="210" width="200" height="140" rx="6" fill="rgba(225,112,85,0.08)" stroke="#e17055" strokeWidth="1" opacity="0.5" />
        <text x="380" y="285" textAnchor="middle" fill="#e17055" fontSize="12" fontWeight="600">Conference Room B</text>
        <rect x="440" y="340" width="100" height="14" rx="3" fill="#00b894" opacity="0.7" />
        <text x="490" y="350" textAnchor="middle" fill="white" fontSize="8" fontWeight="600">TERRACE →</text>
      </svg>
    ),
  };

  return plans[floor] || plans.ground;
}

export default CampusMap;
