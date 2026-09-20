import { useEffect, useState } from "react";

function LiveLocations() {
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

  const warningCount = drones.filter(
    (drone) => drone.status === "Warning"
  ).length;

  const averageBattery =
    drones.length > 0
      ? Math.round(
          drones.reduce(
            (total, drone) => total + drone.battery,
            0
          ) / drones.length
        )
      : 0;

  const getMarkerPosition = (index) => {
    const positions = [
      { top: "28%", left: "25%" },
      { top: "50%", left: "68%" },
      { top: "70%", left: "42%" },
      { top: "35%", left: "78%" },
      { top: "60%", left: "20%" },
    ];

    return positions[index % positions.length];
  };

  return (
    <div className="page">

      {/* HEADER */}
      <div className="top-header">
        <div>
          <h1>Live Drone Locations</h1>
          <p>
            Monitor current drone locations and status from the backend.
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
          <h3>Tracked Drones</h3>
          <h2>{loading ? "..." : drones.length}</h2>
          <p>Connected to backend</p>
        </div>

        <div className="card">
          <h3>Active</h3>
          <h2>{loading ? "..." : activeCount}</h2>
          <p>Currently operating</p>
        </div>

        <div className="card">
          <h3>Average Battery</h3>
          <h2>{loading ? "..." : `${averageBattery}%`}</h2>
          <p>Fleet average</p>
        </div>

        <div className="card">
          <h3>Warnings</h3>
          <h2>{loading ? "..." : warningCount}</h2>
          <p>Requires attention</p>
        </div>

      </div>

      {/* MAP */}
      <div className="section">

        <div className="section-heading">
          <h2>Fleet Location Map</h2>
          <span>Live Tracking</span>
        </div>

        <div
          style={{
            position: "relative",
            height: "420px",
            background: "#e8f0f7",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid #d1d5db",
          }}
        >

          <div
            style={{
              position: "absolute",
              top: "15px",
              left: "15px",
              background: "white",
              padding: "10px 15px",
              borderRadius: "8px",
              fontWeight: "600",
              zIndex: 5,
            }}
          >
            📍 Hyderabad / Secunderabad
          </div>

          {/* Road lines */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "5px",
              background: "#cbd5e1",
              top: "48%",
              left: "0",
              transform: "rotate(-8deg)",
            }}
          ></div>

          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "5px",
              background: "#cbd5e1",
              top: "65%",
              left: "0",
              transform: "rotate(10deg)",
            }}
          ></div>

          <div
            style={{
              position: "absolute",
              width: "5px",
              height: "100%",
              background: "#cbd5e1",
              left: "45%",
              top: "0",
              transform: "rotate(12deg)",
            }}
          ></div>

          {/* Drone markers */}
          {!loading &&
            drones.map((drone, index) => {
              const position = getMarkerPosition(index);

              return (
                <button
                  key={drone.id}
                  onClick={() => setSelectedDrone(drone)}
                  title={drone.id}
                  style={{
                    position: "absolute",
                    top: position.top,
                    left: position.left,
                    width: "54px",
                    height: "54px",
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
                >
                  🚁
                </button>
              );
            })}

        </div>

      </div>

      {/* DRONE LOCATION TABLE */}
      <div className="section">

        <div className="section-heading">
          <h2>Live Drone Status</h2>
          <span>{drones.length} drones</span>
        </div>

        {loading ? (
          <p>Loading live drone data...</p>
        ) : (
          <div style={{ overflowX: "auto" }}>

            <table className="drone-table">

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
                    </td>

                    <td>
                      {drone.status}
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
        )}

      </div>

      {/* DRONE DETAILS POPUP */}
      {selectedDrone && (
        <div className="modal-overlay">

          <div className="modal-box">

            <h2>🚁 Drone Details</h2>

            <p>
              <strong>Drone ID:</strong>{" "}
              {selectedDrone.id}
            </p>

            <p>
              <strong>Model:</strong>{" "}
              {selectedDrone.model}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {selectedDrone.location}
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
              <strong>Mission:</strong>{" "}
              {selectedDrone.mission}
            </p>

            <button
              className="view-button"
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

export default LiveLocations;