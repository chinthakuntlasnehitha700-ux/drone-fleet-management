import React, { useState } from "react";

function Report() {
  const [reportType, setReportType] = useState("overview");

  const reports = {
    overview: {
      title: "Fleet Overview Report",
      description:
        "Summary of the overall drone fleet performance.",
    },
    missions: {
      title: "Mission Performance Report",
      description:
        "Summary of completed and active drone missions.",
    },
    battery: {
      title: "Battery Health Report",
      description:
        "Battery condition and charging information for the fleet.",
    },
  };

  const currentReport = reports[reportType];

  const generateReport = () => {
    alert(`${currentReport.title} generated successfully!`);
  };

  return (
    <div className="page">

      {/* HEADER */}
      <div className="page-header">

        <div>
          <h1>Reports & Analytics</h1>

          <p>
            View fleet performance, mission activity and drone health reports.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={generateReport}
        >
          📄 Generate Report
        </button>

      </div>

      {/* REPORT STATISTICS */}
      <div className="mission-stats">

        <div className="stat-card">
          <span>🎯</span>

          <div>
            <small>Missions Completed</small>
            <h2>148</h2>
          </div>
        </div>

        <div className="stat-card">
          <span>⏱️</span>

          <div>
            <small>Flight Hours</small>
            <h2>326.5</h2>
          </div>
        </div>

        <div className="stat-card">
          <span>❤️</span>

          <div>
            <small>Average Fleet Health</small>
            <h2>92%</h2>
          </div>
        </div>

        <div className="stat-card">
          <span>✅</span>

          <div>
            <small>Alerts Resolved</small>
            <h2>96%</h2>
          </div>
        </div>

      </div>

      {/* REPORT SELECTOR */}
      <div className="missions-container">

        <div className="section-title">

          <div>
            <h2>Report Categories</h2>

            <p>
              Select a report type to view the details.
            </p>
          </div>

        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >

          <button
            className="view-btn"
            onClick={() => setReportType("overview")}
          >
            📊 Fleet Overview
          </button>

          <button
            className="view-btn"
            onClick={() => setReportType("missions")}
          >
            🎯 Mission Report
          </button>

          <button
            className="view-btn"
            onClick={() => setReportType("battery")}
          >
            🔋 Battery Report
          </button>

        </div>

      </div>

      {/* SELECTED REPORT */}
      <div className="missions-container">

        <div className="section-title">

          <div>
            <h2>{currentReport.title}</h2>

            <p>
              {currentReport.description}
            </p>
          </div>

        </div>

        {/* OVERVIEW REPORT */}
        {reportType === "overview" && (

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(2, minmax(200px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >

            <div className="stat-card">
              <small>Total Drones</small>
              <h2>12</h2>
              <p>Registered in fleet</p>
            </div>

            <div className="stat-card">
              <small>Active Drones</small>
              <h2>8</h2>
              <p>Currently operating</p>
            </div>

            <div className="stat-card">
              <small>Charging Drones</small>
              <h2>2</h2>
              <p>Currently charging</p>
            </div>

            <div className="stat-card">
              <small>Fleet Health</small>
              <h2>92%</h2>
              <p>Overall fleet condition</p>
            </div>

          </div>

        )}

        {/* MISSION REPORT */}
        {reportType === "missions" && (

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(2, minmax(200px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >

            <div className="stat-card">
              <small>Total Missions</small>
              <h2>164</h2>
              <p>All recorded missions</p>
            </div>

            <div className="stat-card">
              <small>Completed</small>
              <h2>148</h2>
              <p>Successfully completed</p>
            </div>

            <div className="stat-card">
              <small>In Progress</small>
              <h2>5</h2>
              <p>Currently active</p>
            </div>

            <div className="stat-card">
              <small>Success Rate</small>
              <h2>90%</h2>
              <p>Mission completion rate</p>
            </div>

          </div>

        )}

        {/* BATTERY REPORT */}
        {reportType === "battery" && (

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(2, minmax(200px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >

            <div className="stat-card">
              <small>Average Battery</small>
              <h2>67%</h2>
              <p>Current fleet average</p>
            </div>

            <div className="stat-card">
              <small>Low Battery Drones</small>
              <h2>1</h2>
              <p>Below 20%</p>
            </div>

            <div className="stat-card">
              <small>Charging Stations</small>
              <h2>4</h2>
              <p>Total available stations</p>
            </div>

            <div className="stat-card">
              <small>Battery Alerts</small>
              <h2>3</h2>
              <p>Recent battery warnings</p>
            </div>

          </div>

        )}

      </div>

      {/* ACTIVITY TABLE */}
      <div className="missions-container">

        <div className="section-title">

          <div>
            <h2>Recent Report Activity</h2>

            <p>
              Latest generated reports and analysis.
            </p>
          </div>

        </div>

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>Report</th>
                <th>Type</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>Fleet Overview</td>
                <td>Performance</td>
                <td>Completed</td>
                <td>Today</td>
              </tr>

              <tr>
                <td>Mission Performance</td>
                <td>Mission</td>
                <td>Completed</td>
                <td>Yesterday</td>
              </tr>

              <tr>
                <td>Battery Health</td>
                <td>Battery</td>
                <td>Completed</td>
                <td>2 days ago</td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Report;