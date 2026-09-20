import React, { useState } from "react";

function DockingStations() {
  const [stations, setStations] = useState([
    {
      id: "DS-01",
      location: "Main Campus",
      status: "Available",
      battery: 92,
      drone: "No Drone",
      temperature: 27,
    },
    {
      id: "DS-02",
      location: "Zone B",
      status: "Attention",
      battery: 64,
      drone: "DR-007",
      temperature: 34,
    },
    {
      id: "DS-03",
      location: "Zone C",
      status: "Charging",
      battery: 78,
      drone: "DR-003",
      temperature: 29,
    },
    {
      id: "DS-04",
      location: "Zone A",
      status: "Available",
      battery: 96,
      drone: "No Drone",
      temperature: 26,
    },
  ]);

  const [selectedStation, setSelectedStation] = useState(null);

  const availableCount = stations.filter(
    (station) => station.status === "Available"
  ).length;

  const chargingCount = stations.filter(
    (station) => station.status === "Charging"
  ).length;

  const attentionCount = stations.filter(
    (station) => station.status === "Attention"
  ).length;

  const restartStation = (id) => {
    setStations(
      stations.map((station) =>
        station.id === id
          ? {
              ...station,
              status: "Available",
            }
          : station
      )
    );

    alert(`${id} restarted successfully.`);
  };

  const refreshStations = () => {
    alert("Docking station data refreshed!");
  };

  return (
    <div className="page">

      {/* HEADER */}
      <div className="page-header">

        <div>
          <h1>Docking Stations</h1>
          <p>
            Monitor charging stations and drone docking activity.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={refreshStations}
        >
          🔄 Refresh
        </button>

      </div>

      {/* STATISTICS */}
      <div className="mission-stats">

        <div className="stat-card">
          <span>🔋</span>
          <div>
            <small>Total Stations</small>
            <h2>{stations.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span>🟢</span>
          <div>
            <small>Available</small>
            <h2>{availableCount}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span>⚡</span>
          <div>
            <small>Charging</small>
            <h2>{chargingCount}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span>⚠️</span>
          <div>
            <small>Attention</small>
            <h2>{attentionCount}</h2>
          </div>
        </div>

      </div>

      {/* STATION LIST */}
      <div className="missions-container">

        <div className="section-title">

          <div>
            <h2>Station Status</h2>
            <p>
              Current status of all docking stations
            </p>
          </div>

          <span>
            {stations.length} stations
          </span>

        </div>

        <div className="docking-grid">

          {stations.map((station) => (

            <div
              className="docking-card"
              key={station.id}
            >

              {/* TOP */}
              <div className="docking-top">

                <div className="station-icon">
                  🔋
                </div>

                <div>
                  <h3>{station.id}</h3>
                  <p>📍 {station.location}</p>
                </div>

                <span
                  className={`station-status ${
                    station.status === "Available"
                      ? "available"
                      : station.status === "Charging"
                      ? "charging"
                      : "attention"
                  }`}
                >
                  {station.status}
                </span>

              </div>

              {/* DETAILS */}
              <div className="docking-details">

                <div className="docking-row">
                  <span>🚁 Connected Drone</span>
                  <strong>{station.drone}</strong>
                </div>

                <div className="docking-row">
                  <span>🌡️ Temperature</span>
                  <strong>{station.temperature}°C</strong>
                </div>

                <div className="docking-row">
                  <span>🔋 Station Battery</span>
                  <strong>{station.battery}%</strong>
                </div>

              </div>

              {/* BATTERY */}
              <div className="station-battery">

                <div className="battery-label">
                  <span>Battery Capacity</span>
                  <strong>{station.battery}%</strong>
                </div>

                <div className="progress-bar">

                  <div
                    className="progress-fill"
                    style={{
                      width: `${station.battery}%`,
                    }}
                  ></div>

                </div>

              </div>

              {/* BUTTON */}
              {station.status === "Attention" && (

                <button
                  className="restart-btn"
                  onClick={() =>
                    restartStation(station.id)
                  }
                >
                  🔄 Restart Station
                </button>

              )}

              {station.status !== "Attention" && (

                <button
                  className="view-btn docking-view-btn"
                  onClick={() =>
                    setSelectedStation(station)
                  }
                >
                  View Details
                </button>

              )}

            </div>

          ))}

        </div>

      </div>

      {/* DETAILS POPUP */}
      {selectedStation && (

        <div className="modal-overlay">

          <div className="modal-box">

            <h2>Docking Station Details</h2>

            <p>
              <strong>Station:</strong>{" "}
              {selectedStation.id}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {selectedStation.location}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {selectedStation.status}
            </p>

            <p>
              <strong>Connected Drone:</strong>{" "}
              {selectedStation.drone}
            </p>

            <p>
              <strong>Temperature:</strong>{" "}
              {selectedStation.temperature}°C
            </p>

            <p>
              <strong>Battery:</strong>{" "}
              {selectedStation.battery}%
            </p>

            <button
              className="primary-btn"
              onClick={() => setSelectedStation(null)}
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default DockingStations;