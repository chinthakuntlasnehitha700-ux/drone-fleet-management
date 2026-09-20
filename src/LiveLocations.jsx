import React, { useState } from "react";

function LiveLocations() {
  const [drones] = useState([
    {
      id: "DR-001",
      location: "Hyderabad",
      area: "Hitech City",
      status: "Active",
      battery: 92,
      signal: "Strong",
      mission: "Delivery A",
      latitude: 17.4483,
      longitude: 78.3915,
    },
    {
      id: "DR-002",
      location: "Secunderabad",
      area: "Paradise",
      status: "In Mission",
      battery: 68,
      signal: "Strong",
      mission: "Survey B",
      latitude: 17.4399,
      longitude: 78.4983,
    },
    {
      id: "DR-003",
      location: "Hyderabad",
      area: "Banjara Hills",
      status: "Returning",
      battery: 41,
      signal: "Medium",
      mission: "Return",
      latitude: 17.4156,
      longitude: 78.4347,
    },
    {
      id: "DR-004",
      location: "Hyderabad",
      area: "Gachibowli",
      status: "Warning",
      battery: 23,
      signal: "Weak",
      mission: "Inspection",
      latitude: 17.4401,
      longitude: 78.3489,
    },
  ]);

  const [selectedDrone, setSelectedDrone] = useState(null);

  const activeCount = drones.filter(
    (drone) =>
      drone.status === "Active" ||
      drone.status === "In Mission"
  ).length;

  const warningCount = drones.filter(
    (drone) => drone.status === "Warning"
  ).length;

  const averageBattery = Math.round(
    drones.reduce(
      (total, drone) => total + drone.battery,
      0
    ) / drones.length
  );

  const refreshLocations = () => {
    alert("Live drone locations refreshed!");
  };

  return (
    <div className="page">

      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1>Live Drone Locations</h1>
          <p>
            Monitor the current locations and status of your drone fleet.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={refreshLocations}
        >
          🔄 Refresh
        </button>
      </div>

      {/* STATISTICS */}
      <div className="mission-stats">

        <div className="stat-card">
          <span>📍</span>

          <div>
            <small>Tracked Drones</small>
            <h2>{drones.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span>🟢</span>

          <div>
            <small>Active</small>
            <h2>{activeCount}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span>🔋</span>

          <div>
            <small>Average Battery</small>
            <h2>{averageBattery}%</h2>
          </div>
        </div>

        <div className="stat-card">
          <span>⚠️</span>

          <div>
            <small>Warnings</small>
            <h2>{warningCount}</h2>
          </div>
        </div>

      </div>

      {/* LOCATION AREA */}
      <div className="missions-container">

        <div className="section-title">

          <div>
            <h2>Fleet Location Overview</h2>
            <p>
              Current drone positions across Hyderabad and Secunderabad
            </p>
          </div>

          <span>
            Live Tracking
          </span>

        </div>

        {/* SIMPLE MAP AREA */}
        <div
          style={{
            position: "relative",
            height: "420px",
            background: "#eaf2f8",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid #dbe3ea",
          }}
        >

          {/* MAP TITLE */}
          <div
            style={{
              position: "absolute",
              top: "15px",
              left: "15px",
              background: "white",
              padding: "10px 15px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              zIndex: 5,
            }}
          >
            📍 Hyderabad Drone Tracking Map
          </div>

          {/* ROAD LINES */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "4px",
              background: "#d1d5db",
              top: "48%",
              left: "0",
              transform: "rotate(-8deg)",
            }}
          ></div>

          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "4px",
              background: "#d1d5db",
              top: "65%",
              left: "0",
              transform: "rotate(10deg)",
            }}
          ></div>

          <div
            style={{
              position: "absolute",
              width: "4px",
              height: "100%",
              background: "#d1d5db",
              left: "45%",
              top: "0",
              transform: "rotate(12deg)",
            }}
          ></div>

          {/* DRONE MARKERS */}
          {drones.map((drone, index) => {

            const positions = [
              { top: "28%", left: "25%" },
              { top: "50%", left: "68%" },
              { top: "70%", left: "42%" },
              { top: "35%", left: "78%" },
            ];

            return (
              <button
                key={drone.id}
                onClick={() => setSelectedDrone(drone)}
                style={{
                  position: "absolute",
                  top: positions[index].top,
                  left: positions[index].left,
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  border: "3px solid white",
                  background:
                    drone.status === "Warning"
                      ? "#dc2626"
                      : "#2563eb",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "22px",
                  boxShadow:
                    "0 3px 10px rgba(0,0,0,0.25)",
                }}
                title={drone.id}
              >
                🚁
              </button>
            );
          })}

        </div>

      </div>

      {/* DRONE LOCATIONS */}
      <div className="missions-container">

        <div className="section-title">

          <div>
            <h2>Live Drone Status</h2>
            <p>
              Real-time monitoring information
            </p>
          </div>

          <span>
            {drones.length} drones
          </span>

        </div>

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>Drone ID</th>
                <th>Location</th>
                <th>Status</th>
                <th>Battery</th>
                <th>Signal</th>
                <th>Mission</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {drones.map((drone) => (

                <tr key={drone.id}>

                  <td>
                    <strong>{drone.id}</strong>
                  </td>

                  <td>
                    📍 {drone.location}
                    <br />
                    <small>{drone.area}</small>
                  </td>

                  <td>
                    <span
                      className="status-badge"
                    >
                      {drone.status}
                    </span>
                  </td>

                  <td>
                    {drone.battery}%
                  </td>

                  <td>
                    {drone.signal}
                  </td>

                  <td>
                    {drone.mission}
                  </td>

                  <td>

                    <button
                      className="view-btn"
                      onClick={() =>
                        setSelectedDrone(drone)
                      }
                    >
                      View
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* SELECTED DRONE POPUP */}
      {selectedDrone && (

        <div className="modal-overlay">

          <div className="modal-box">

            <h2>
              🚁 {selectedDrone.id}
            </h2>

            <p>
              <strong>Location:</strong>{" "}
              {selectedDrone.location}
            </p>

            <p>
              <strong>Area:</strong>{" "}
              {selectedDrone.area}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {selectedDrone.status}
            </p>

            <p>
              <strong>Battery:</strong>{" "}
              {selectedDrone.battery}%
            </p>

            <p>
              <strong>Signal:</strong>{" "}
              {selectedDrone.signal}
            </p>

            <p>
              <strong>Mission:</strong>{" "}
              {selectedDrone.mission}
            </p>

            <p>
              <strong>Latitude:</strong>{" "}
              {selectedDrone.latitude}
            </p>

            <p>
              <strong>Longitude:</strong>{" "}
              {selectedDrone.longitude}
            </p>

            <button
              className="primary-btn"
              onClick={() =>
                setSelectedDrone(null)
              }
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default LiveLocations;