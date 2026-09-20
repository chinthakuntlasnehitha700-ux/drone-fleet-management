import { useState } from "react";
import "./App.css";

import Drones from "./Drones.jsx";
import LiveLocations from "./LiveLocations.jsx";
import Missions from "./Missions.jsx";
import Alerts from "./Alerts.jsx";

function App() {
  const [page, setPage] = useState("dashboard");

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
                  AI-assisted monitoring and fleet
                  management
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
                <h2>12</h2>
                <p>Registered drones</p>
              </div>

              <div className="card">
                <h3>Active Drones</h3>
                <h2>8</h2>
                <p>Currently flying</p>
              </div>

              <div className="card">
                <h3>Fleet Health</h3>
                <h2>92%</h2>
                <p>Overall fleet health</p>
              </div>

              <div className="card">
                <h3>Active Alerts</h3>
                <h2>3</h2>
                <p>Requires attention</p>
              </div>

            </div>

            {/* WELCOME */}

            <div className="welcome-box">

              <h2>
                Welcome to DroneFleet AI 🚁
              </h2>

              <p>
                Manage your drone fleet, monitor
                missions, track live locations and use
                AI-assisted predictions from one
                platform.
              </p>

            </div>

            {/* FLEET STATUS */}

            <div className="section">

              <div className="section-heading">

                <h2>
                  Fleet Status
                </h2>

              </div>

              <div className="status-grid">

                <div className="status-box">
                  <span>🟢</span>
                  <strong>8</strong>
                  <p>Active</p>
                </div>

                <div className="status-box">
                  <span>⚡</span>
                  <strong>2</strong>
                  <p>Charging</p>
                </div>

                <div className="status-box">
                  <span>🔵</span>
                  <strong>1</strong>
                  <p>Available</p>
                </div>

                <div className="status-box">
                  <span>⚠️</span>
                  <strong>1</strong>
                  <p>Warning</p>
                </div>

              </div>

            </div>

            {/* RECENT ALERTS */}

            <div className="section">

              <div className="section-heading">

                <h2>
                  Recent Alerts
                </h2>

                <button
                  className="view-button"
                  onClick={() =>
                    setPage("alerts")
                  }
                >
                  View All
                </button>

              </div>

              <div className="alert-box">
                ⚠️ DR-003 battery is below 20%.
              </div>

              <div className="alert-box">
                ⚠️ DR-007 connection signal is weak.
              </div>

              <div className="alert-box">
                ⚠️ Docking Station DS-02 requires
                attention.
              </div>

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

        {/* ================= DOCKING STATIONS ================= */}

        {page === "docking" && (

          <div className="coming-soon">

            <h1>
              🔋 Docking Stations
            </h1>

            <p>
              Docking Stations module will be added next.
            </p>

            <button
              className="back-button"
              onClick={() =>
                setPage("dashboard")
              }
            >
              ← Back to Dashboard
            </button>

          </div>

        )}

        {/* ================= AI PREDICTIONS ================= */}

        {page === "ai" && (

          <div className="coming-soon">

            <h1>
              🤖 AI Predictions
            </h1>

            <p>
              AI Predictions module will be added next.
            </p>

            <button
              className="back-button"
              onClick={() =>
                setPage("dashboard")
              }
            >
              ← Back to Dashboard
            </button>

          </div>

        )}

        {/* ================= REPORTS ================= */}

        {page === "reports" && (

          <div className="coming-soon">

            <h1>
              📈 Reports
            </h1>

            <p>
              Reports module will be added next.
            </p>

            <button
              className="back-button"
              onClick={() =>
                setPage("dashboard")
              }
            >
              ← Back to Dashboard
            </button>

          </div>

        )}

      </main>

    </div>
  );
}

export default App;