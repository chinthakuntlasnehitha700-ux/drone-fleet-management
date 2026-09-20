import React, { useState } from "react";

function Drones() {
  const [drones] = useState([
    {
      id: "DR-001",
      model: "Falcon X1",
      status: "Active",
      battery: 92,
      location: "Hyderabad",
      mission: "Delivery A",
      temperature: 31,
      signal: "Strong",
    },
    {
      id: "DR-002",
      model: "Falcon X1",
      status: "In Mission",
      battery: 68,
      location: "Secunderabad",
      mission: "Survey B",
      temperature: 29,
      signal: "Strong",
    },
    {
      id: "DR-003",
      model: "Hawk Pro",
      status: "Charging",
      battery: 41,
      location: "Dock A",
      mission: "Returning",
      temperature: 30,
      signal: "Medium",
    },
    {
      id: "DR-004",
      model: "Hawk Pro",
      status: "Warning",
      battery: 23,
      location: "Hyderabad",
      mission: "Maintenance",
      temperature: 35,
      signal: "Weak",
    },
    {
      id: "DR-005",
      model: "Falcon X2",
      status: "Available",
      battery: 87,
      location: "Dock B",
      mission: "None",
      temperature: 28,
      signal: "Strong",
    },
  ]);

  const [selectedDrone, setSelectedDrone] = useState(null);

  const activeCount = drones.filter(
    (drone) =>
      drone.status === "Active" ||
      drone.status === "In Mission"
  ).length;

  const chargingCount = drones.filter(
    (drone) => drone.status === "Charging"
  ).length;

  const availableCount = drones.filter(
    (drone) => drone.status === "Available"
  ).length;

  const warningCount = drones.filter(
    (drone) => drone.status === "Warning"
  ).length;

  const getStatusClass = (status) => {
    if (status === "Active") return "active";
    if (status === "In Mission") return "mission";
    if (status === "Charging") return "charging";
    if (status === "Available") return "available";
    return "warning";
  };

  return (
    <div className="page">

      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1>Drone Fleet</h1>
          <p>
            Monitor and manage all drones in your fleet.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => alert("Drone list refreshed!")}
        >
          🔄 Refresh
        </button>
      </div>

      {/* STATISTICS */}
      <div className="mission-stats">

        <div className="stat-card">
          <span>🚁</span>
          <div>
            <small>Total Drones</small>
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
          <span>⚡</span>
          <div>
            <small>Charging</small>
            <h2>{chargingCount}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span>⚠️</span>
          <div>
            <small>Warning</small>
            <h2>{warningCount}</h2>
          </div>
        </div>

      </div>

      {/* DRONE TABLE */}
      <div className="missions-container">

        <div className="section-title">
          <div>
            <h2>All Drones</h2>
            <p>
              Current status and health information
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
                <th>Model</th>
                <th>Status</th>
                <th>Battery</th>
                <th>Location</th>
                <th>Mission</th>
                <th>Signal</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {drones.map((drone) => (

                <tr key={drone.id}>

                  <td>
                    <strong>{drone.id}</strong>
                  </td>

                  <td>{drone.model}</td>

                  <td>
                    <span
                      className={`status-badge ${getStatusClass(
                        drone.status
                      )}`}
                    >
                      {drone.status}
                    </span>
                  </td>

                  <td>
                    <div className="battery-cell">
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${drone.battery}%`,
                          }}
                        ></div>
                      </div>

                      <span>{drone.battery}%</span>
                    </div>
                  </td>

                  <td>📍 {drone.location}</td>

                  <td>{drone.mission}</td>

                  <td>{drone.signal}</td>

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

      {/* EXTRA STATUS */}
      <div className="missions-container">

        <div className="section-title">
          <div>
            <h2>Fleet Overview</h2>
            <p>
              Quick summary of drone availability
            </p>
          </div>
        </div>

        <div className="mission-stats">

          <div className="stat-card">
            <span>🔵</span>
            <div>
              <small>Available</small>
              <h2>{availableCount}</h2>
            </div>
          </div>

          <div className="stat-card">
            <span>⚠️</span>
            <div>
              <small>Needs Attention</small>
              <h2>{warningCount}</h2>
            </div>
          </div>

        </div>

      </div>

      {/* DETAILS POPUP */}
      {selectedDrone && (
        <div className="modal-overlay">

          <div className="modal-box">

            <h2>Drone Details</h2>

            <p>
              <strong>Drone ID:</strong>{" "}
              {selectedDrone.id}
            </p>

            <p>
              <strong>Model:</strong>{" "}
              {selectedDrone.model}
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
              <strong>Temperature:</strong>{" "}
              {selectedDrone.temperature}°C
            </p>

            <p>
              <strong>Signal:</strong>{" "}
              {selectedDrone.signal}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {selectedDrone.location}
            </p>

            <p>
              <strong>Mission:</strong>{" "}
              {selectedDrone.mission}
            </p>

            <button
              className="primary-btn"
              onClick={() => setSelectedDrone(null)}
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Drones;