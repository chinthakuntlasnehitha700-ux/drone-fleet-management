import { useEffect, useState } from "react";
import "./App.css";

import Drones from "./Drones.jsx";
import LiveLocations from "./LiveLocations.jsx";
import Missions from "./Missions.jsx";
import Alerts from "./Alerts.jsx";
import DockingStations from "./DockingStations.jsx";
import AIPredictions from "./AIPredictions.jsx";
import Report from "./Report.jsx";

function App() {
  const [page, setPage] = useState("dashboard");
  const [drones, setDrones] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDrones = () => {
    setLoading(true);

    fetch("http://127.0.0.1:8000/api/drones")
      .then((response) => response.json())
      .then((data) => {
        setDrones(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Backend error:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadDrones();
  }, []);

  const activeDrones = drones.filter(
    (drone) =>
      drone.status === "Active" ||
      drone.status === "In Mission"
  ).length;

  const chargingDrones = drones.filter(
    (drone) => drone.status === "Charging"
  ).length;

  const warningDrones = drones.filter(
    (drone) => drone.status === "Warning"
  ).length;

  const lowBatteryDrones = drones.filter(
    (drone) => drone.battery < 20
  ).length;

  const activeAlerts =
    warningDrones + lowBatteryDrones;

  const averageBattery =
    drones.length > 0
      ? Math.round(
          drones.reduce(
            (total, drone) => total + drone.battery,
            0
          ) / drones.length
        )
      : 0;

  return (
    <div className="app">

      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">

        <div className="logo">
          🚁 <span>DroneFleet AI</span>
        </div>

        <nav>

          <button
            className={
              page === "dashboard" ? "active" : ""
            }
            onClick={() => setPage("dashboard")}
          >
            📊 Dashboard
          </button>

          <button
            className={
              page === "drones" ? "active" : ""
            }
            onClick={() => setPage("drones")}
          >
            🚁 Drones
          </button>

          <button
            className={
              page === "live" ? "active" : ""
            }
            onClick={() => setPage("live")}
          >
            📍 Live Locations
          </button>

          <button
            className={
              page === "missions" ? "active" : ""
            }
            onClick={() => setPage("missions")}
          >
            🎯 Missions
          </button>

          <button
            className={
              page === "alerts" ? "active" : ""
            }
            onClick={() => setPage("alerts")}
          >
            🔔 Alerts
          </button>

          <button
            className={
              page === "docking" ? "active" : ""
            }
            onClick={() => setPage("docking")}
          >
            🔋 Docking Stations
          </button>

          <button
            className={
              page === "ai" ? "active" : ""
            }
            onClick={() => setPage("ai")}
          >
            🤖 AI Predictions
          </button>

          <button
            className={
              page === "reports" ? "active" : ""
            }
            onClick={() => setPage("reports")}
          >
            📈 Reports
          </button>

        </nav>

      </aside>

      {/* ================= MAIN CONTENT ================= */}

      <main className="main-content">

        {/* ================= DASHBOARD ================= */}

        {page === "dashboard" && (

          <div className="page">

            {/* HEADER */}

            <div className="top-header">

              <div>

                <h1>
                  Drone Fleet Dashboard
                </h1>

                <p>
                  AI-assisted monitoring and fleet management
                </p>

              </div>

              <div className="admin">
                👤 Admin
              </div>

            </div>

            {/* DASHBOARD CARDS */}

            <div className="cards">

              <div className="card">
                <h3>Total Drones</h3>

                <h2>
                  {loading ? "..." : drones.length}
                </h2>

                <p>
                  From backend
                </p>
              </div>

              <div className="card">
                <h3>Active Drones</h3>

                <h2>
                  {loading ? "..." : activeDrones}
                </h2>

                <p>
                  Active or in mission
                </p>
              </div>

              <div className="card">
                <h3>Fleet Health</h3>

                <h2>
                  {loading ? "..." : `${averageBattery}%`}
                </h2>

                <p>
                  Average battery level
                </p>
              </div>

              <div className="card">
                <h3>Active Alerts</h3>

                <h2>
                  {loading ? "..." : activeAlerts}
                </h2>

                <p>
                  Requires attention
                </p>
              </div>

            </div>

            {/* WELCOME */}

            <div className="welcome-box">

              <h2>
                Welcome to DroneFleet AI 🚁
              </h2>

              <p>
                Manage your drone fleet, monitor missions,
                track live locations and use AI-assisted
                predictions from one platform.
              </p>

            </div>

            {/* FLEET STATUS */}

            <div className="section">

              <div className="section-heading">

                <h2>
                  Fleet Status
                </h2>

                <button
                  className="view-button"
                  onClick={loadDrones}
                >
                  🔄 Refresh
                </button>

              </div>

              <div className="status-grid">

                <div className="status-box">

                  <span>🟢</span>

                  <strong>
                    {loading ? "..." : activeDrones}
                  </strong>

                  <p>
                    Active
                  </p>

                </div>

                <div className="status-box">

                  <span>⚡</span>

                  <strong>
                    {loading ? "..." : chargingDrones}
                  </strong>

                  <p>
                    Charging
                  </p>

                </div>

                <div className="status-box">

                  <span>🔋</span>

                  <strong>
                    {loading ? "..." : lowBatteryDrones}
                  </strong>

                  <p>
                    Low Battery
                  </p>

                </div>

                <div className="status-box">

                  <span>⚠️</span>

                  <strong>
                    {loading ? "..." : warningDrones}
                  </strong>

                  <p>
                    Warning
                  </p>

                </div>

              </div>

            </div>

            {/* BACKEND DRONE TABLE */}

            <div className="section">

              <div className="section-heading">

                <h2>
                  Live Drone Data
                </h2>

                <button
                  className="view-button"
                  onClick={() => setPage("drones")}
                >
                  View All
                </button>

              </div>

              {loading ? (

                <p>
                  Loading drone data...
                </p>

              ) : (

                <div style={{ overflowX: "auto" }}>

                  <table className="drone-table">

                    <thead>

                      <tr>
                        <th>Drone ID</th>
                        <th>Status</th>
                        <th>Battery</th>
                        <th>Location</th>
                        <th>Mission</th>
                      </tr>

                    </thead>

                    <tbody>

                      {drones.map((drone) => (

                        <tr key={drone.id}>

                          <td>
                            <strong>
                              {drone.id}
                            </strong>
                          </td>

                          <td>
                            {drone.status}
                          </td>

                          <td>
                            {drone.battery}%
                          </td>

                          <td>
                            📍 {drone.location}
                          </td>

                          <td>
                            {drone.mission}
                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              )}

            </div>

            {/* RECENT ALERTS */}

            <div className="section">

              <div className="section-heading">

                <h2>
                  Recent Alerts
                </h2>

                <button
                  className="view-button"
                  onClick={() => setPage("alerts")}
                >
                  View All
                </button>

              </div>

              {lowBatteryDrones > 0 && (

                <div className="alert-box">
                  ⚠️ At least one drone has low battery.
                </div>

              )}

              {warningDrones > 0 && (

                <div className="alert-box">
                  ⚠️ At least one drone requires attention.
                </div>

              )}

              {lowBatteryDrones === 0 &&
                warningDrones === 0 && (

                  <div className="alert-box">
                    ✅ All drone systems are operating normally.
                  </div>

                )}

            </div>

          </div>

        )}

        {/* ================= DRONES ================= */}

        {page === "drones" && (
          <Drones />
        )}

        {/* ================= LIVE LOCATIONS ================= */}

        {page === "live" && (
          <LiveLocations />
        )}

        {/* ================= MISSIONS ================= */}

        {page === "missions" && (
          <Missions />
        )}

        {/* ================= ALERTS ================= */}

        {page === "alerts" && (
          <Alerts />
        )}

        {/* ================= DOCKING ================= */}

        {page === "docking" && (
          <DockingStations />
        )}

        {/* ================= AI PREDICTIONS ================= */}

        {page === "ai" && (
          <AIPredictions />
        )}

        {/* ================= REPORTS ================= */}

        {page === "reports" && (
          <Report />
        )}

      </main>

    </div>
  );
}

export default App;