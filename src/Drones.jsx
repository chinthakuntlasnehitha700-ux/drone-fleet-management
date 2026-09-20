import { useEffect, useState } from "react";

function Drones() {
  const [drones, setDrones] = useState([]);
  const [selectedDrone, setSelectedDrone] = useState(null);
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

  const lowBatteryCount = drones.filter(
    (drone) => drone.battery < 20
  ).length;

  const getStatusClass = (status) => {
    if (status === "Active") {
      return "status-active";
    }

    if (status === "In Mission") {
      return "status-mission";
    }

    if (status === "Charging") {
      return "status-charging";
    }

    if (status === "Available") {
      return "status-available";
    }

    return "status-warning";
  };

  if (loading) {
    return (
      <div className="page">
        <h1>Drone Fleet</h1>
        <p>Loading drone data...</p>
      </div>
    );
  }

  return (
    <div className="page">

      {/* HEADER */}
      <div className="top-header">

        <div>
          <h1>Drone Fleet</h1>

          <p>
            Live drone data received from the backend.
          </p>
        </div>

        <button
          className="view-button"
          onClick={loadDrones}
        >
          🔄 Refresh
        </button>

      </div>

      {/* STATISTICS */}
      <div className="cards">

        <div className="card">
          <h3>Total Drones</h3>
          <h2>{drones.length}</h2>
          <p>Backend registered drones</p>
        </div>

        <div className="card">
          <h3>Active Drones</h3>
          <h2>{activeCount}</h2>
          <p>Active or in mission</p>
        </div>

        <div className="card">
          <h3>Charging</h3>
          <h2>{chargingCount}</h2>
          <p>Currently charging</p>
        </div>

        <div className="card">
          <h3>Warnings</h3>
          <h2>{warningCount}</h2>
          <p>Needs attention</p>
        </div>

      </div>

      {/* LOW BATTERY */}
      <div className="welcome-box">

        <h2>
          Fleet Monitoring 🚁
        </h2>

        <p>
          {lowBatteryCount} drone(s) currently have
          battery below 20%.
        </p>

      </div>

      {/* DRONE TABLE */}
      <div className="section">

        <div className="section-heading">

          <h2>
            All Drones
          </h2>

          <span>
            {drones.length} drones
          </span>

        </div>

        <div style={{ overflowX: "auto" }}>

          <table className="drone-table">

            <thead>

              <tr>
                <th>Drone ID</th>
                <th>Model</th>
                <th>Status</th>
                <th>Battery</th>
                <th>Location</th>
                <th>Mission</th>
                <th>Temperature</th>
                <th>Signal</th>
                <th>Action</th>
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
                    {drone.model}
                  </td>

                  <td>
                    <span
                      className={getStatusClass(
                        drone.status
                      )}
                    >
                      {drone.status}
                    </span>
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

                  <td>
                    {drone.temperature}°C
                  </td>

                  <td>
                    {drone.signal}
                  </td>

                  <td>

                    <button
                      className="view-button"
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

      {/* FLEET SUMMARY */}
      <div className="section">

        <div className="section-heading">
          <h2>Fleet Summary</h2>
        </div>

        <div className="status-grid">

          <div className="status-box">
            <span>🟢</span>
            <strong>{activeCount}</strong>
            <p>Active</p>
          </div>

          <div className="status-box">
            <span>⚡</span>
            <strong>{chargingCount}</strong>
            <p>Charging</p>
          </div>

          <div className="status-box">
            <span>🔵</span>
            <strong>{availableCount}</strong>
            <p>Available</p>
          </div>

          <div className="status-box">
            <span>⚠️</span>
            <strong>{warningCount}</strong>
            <p>Warning</p>
          </div>

        </div>

      </div>

      {/* DRONE DETAILS POPUP */}
      {selectedDrone && (

        <div className="modal-overlay">

          <div className="modal-box">

            <h2>
              🚁 Drone Details
            </h2>

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
              <strong>Location:</strong>{" "}
              {selectedDrone.location}
            </p>

            <p>
              <strong>Mission:</strong>{" "}
              {selectedDrone.mission}
            </p>

            <p>
              <strong>Temperature:</strong>{" "}
              {selectedDrone.temperature}°C
            </p>

            <p>
              <strong>Signal:</strong>{" "}
              {selectedDrone.signal}
            </p>

            <button
              className="view-button"
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

export default Drones;