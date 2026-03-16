import React, { useState, useEffect } from 'react';
import './Attendance.css';

function Attendance() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    fetch(`${apiUrl}/api/attendance`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch attendance');
        return res.json();
      })
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Could not load attendance data. Backend may not be running.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="attendance-page">
      <div className="attendance-header">
        <h2 className="uni-title">SVKM'S NMIMS Mukesh Patel Schl of Tech Mgt & Engg-Mum, Mumbai</h2>
        
        <table className="student-info-table">
          <tbody>
            <tr>
              <td><strong>Student Name</strong></td>
              <td>SHAURYA CHABRA</td>
            </tr>
            <tr>
              <td><strong>SAP ID</strong></td>
              <td>7722983672</td>
            </tr>
            <tr>
              <td><strong>Roll No.</strong></td>
              <td>M041</td>
            </tr>
            <tr>
              <td><strong>Academic Year & Academic Session</strong></td>
              <td>2025-2026, Semester II</td>
            </tr>
            <tr>
              <td><strong>Program Name</strong></td>
              <td>PGDM-MM</td>
            </tr>
            <tr>
              <td><strong>Attendance Report Duration :</strong></td>
              <td>From 01.01.2025 to 31.01.2025</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="table-container glass">
        {loading ? (
          <div className="loading-state">Loading attendance data...</div>
        ) : error ? (
          <div className="error-state">{error}</div>
        ) : (
          <table className="nmims-table">
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Course Name</th>
                <th>Lecture Type</th>
                <th>Lecture Conducted</th>
                <th>Lecture Attended (P)</th>
                <th>Total Exemption (E)</th>
                <th>Total (P+E)</th>
                <th>% Attendance (After Exemption)</th>
                <th>Lecture status not updated</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.srNo}>
                  <td className="center">{row.srNo}</td>
                  <td>{row.course}</td>
                  <td>{row.type}</td>
                  <td className="center">{row.conducted}</td>
                  <td className="center">{row.attended}</td>
                  <td className="center">{row.exemption}</td>
                  <td className="center">{row.total}</td>
                  <td className="center">
                    {row.percent === null ? '-' : row.percent.toFixed(2)}
                  </td>
                  <td className="center">{row.notUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      {!loading && !error && (
        <div className="pagination-footer">
          Page 1 of 2
        </div>
      )}
    </div>
  );
}

export default Attendance;
