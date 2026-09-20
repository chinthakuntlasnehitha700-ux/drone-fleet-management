import React, { useState } from "react";

function Alerts() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      level: "Critical",
      icon: "🔴",
      title: "Low Battery",
      message: "DR-003 battery level is below 20%.",
      drone: "DR-003",
      time: "2 minutes ago",
      status: "Active",
    },
    {
      id: 2,
      level: "Warning",
      icon: "⚠️",
      title: "Weak Signal",
      message: "DR-007 connection signal is weak.",
      drone: "DR-007",
      time: "8 minutes ago",
      status: "Active",
    },
    {
      id: 3,
      level: "Warning",
      icon: "🔋",
      title: "Docking Station Alert",
      message: "Docking Station DS-02 requires attention.",
      drone: "DS-02",
      time: "15 minutes ago",
      status: "Active",
    },
    {
      id: 4,
      level: "Info",
      icon: "ℹ️",
      title: "Mission Completed",
      message:
        "DR-004 successfully completed its inspection mission.",
      drone: "DR-004",
      time: "32 minutes ago",
      status: "Active",
    },
    {
      id: 5,
      level: "Warning",
      icon: "🌡️",
      title: "High Temperature",
      message:
        "DR-005 temperature is above the normal operating range.",
      drone: "DR-005",
      time: "45 minutes ago",
      status: "Active",
    },
  ]);

  const acknowledgeAlert = (id) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id
          ? { ...alert, status: "Acknowledged" }
          : alert
      )
    );
  };

  const clearAlert = (id) => {
    setAlerts(
      alerts.filter((alert) => alert.id !== id)
    );
  };

  const activeCount = alerts.filter(
    (alert) => alert.status === "Active"
  ).length;

  const criticalCount = alerts.filter(
    (alert) =>
      alert.level === "Critical" &&
      alert.status === "Active"
  ).length;

  const warningCount = alerts.filter(
    (alert) =>
      alert.level === "Warning" &&
      alert.status === "Active"
  ).length;

  const infoCount = alerts.filter(
    (alert) =>
      alert.level === "Info" &&
      alert.status === "Active"
  ).length;

  const refreshAlerts = () => {
    alert("All alerts have been refreshed!");
  };

  return (
    <div className="page">

      {/* HEADER */}
      <div className="page-header">

        <div>
          <h1>Alerts & Notifications</h1>

          <p>
            Monitor important events and warnings from your drone fleet.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={refreshAlerts}
        >
          🔄 Refresh
        </button>

      </div>

      {/* STATISTICS */}
      <div className="mission-stats">

        <div className="stat-card">
          <span>🔔</span>

          <div>
            <small>Active Alerts</small>
            <h2>{activeCount}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span>🔴</span>

          <div>
            <small>Critical</small>
            <h2>{criticalCount}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span>⚠️</span>

          <div>
            <small>Warnings</small>
            <h2>{warningCount}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span>ℹ️</span>

          <div>
            <small>Information</small>
            <h2>{infoCount}</h2>
          </div>
        </div>

      </div>

      {/* ALERT LIST */}
      <div className="missions-container">

        <div className="section-title">

          <div>
            <h2>Recent Alerts</h2>

            <p>
              Latest notifications from the drone fleet
            </p>
          </div>

          <span>
            {activeCount} active
          </span>

        </div>

        <div className="alert-list">

          {alerts.length === 0 ? (

            <div className="no-alerts">

              <div>✅</div>

              <h3>No Active Alerts</h3>

              <p>
                All drone systems are operating normally.
              </p>

            </div>

          ) : (

            alerts.map((alertItem) => (

              <div
                key={alertItem.id}
                className={`alert-card ${alertItem.level.toLowerCase()}`}
              >

                {/* ICON */}
                <div className="alert-icon">
                  {alertItem.icon}
                </div>

                {/* CONTENT */}
                <div className="alert-content">

                  <div className="alert-title-row">

                    <div>

                      <span
                        className={`alert-level ${alertItem.level.toLowerCase()}`}
                      >
                        {alertItem.level}
                      </span>

                      <h3>
                        {alertItem.title}
                      </h3>

                    </div>

                    <span
                      className={`alert-status ${
                        alertItem.status === "Acknowledged"
                          ? "acknowledged"
                          : ""
                      }`}
                    >
                      {alertItem.status}
                    </span>

                  </div>

                  <p>
                    {alertItem.message}
                  </p>

                  <div className="alert-details">

                    <span>
                      🚁 {alertItem.drone}
                    </span>

                    <span>
                      🕒 {alertItem.time}
                    </span>

                  </div>

                  {/* ACTIONS */}
                  {alertItem.status === "Active" && (

                    <div className="alert-actions">

                      <button
                        className="acknowledge-btn"
                        onClick={() =>
                          acknowledgeAlert(alertItem.id)
                        }
                      >
                        ✓ Acknowledge
                      </button>

                      <button
                        className="clear-alert-btn"
                        onClick={() =>
                          clearAlert(alertItem.id)
                        }
                      >
                        Clear
                      </button>

                    </div>

                  )}

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default Alerts;