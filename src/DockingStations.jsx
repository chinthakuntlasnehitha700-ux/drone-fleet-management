import { useEffect, useState } from "react";

function DockingStations() {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStations = () => {
    setLoading(true);

    fetch("http://127.0.0.1:8000/api/docking-stations")
      .then((response) => response.json())
      .then((data) => {
        setStations(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Backend error:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadStations();
  }, []);

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
    fetch(
      `http://127.0.0.1:8000/api/docking-stations/${id}/restart`,
      {
        method: "POST",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setStations((currentStations) =>
            currentStations.map((station) =>
              station.id === id
                ? data.station
                : station
            )
          );

          alert(`${id} restarted successfully!`);
        }
      })
      .catch((error) => {
        console.log("Restart error:", error);
      });
  };

  return (
    <div className="page">

      {/* HEADER */}
      <div className="top-header">

        <div>
          <h1>Docking Stations</h1>

          <p>
            Monitor docking stations and charging activity from the backend.
          </p>
        </div>

        <button
          className="view-button"
          onClick={loadStations}
        >
          🔄 Refresh
        </button>

      </div>

      {/* STATISTICS */}
      <div className="cards">

        <div className="card">
          <h3>Total Stations</h3>
          <h2>
            {loading ? "..." : stations.length}
          </h2>
          <p>Backend registered stations</p>
        </div>

        <div className="card">
          <h3>Available</h3>
          <h2>
            {loading ? "..." : availableCount}
          </h2>
          <p>Ready for drones</p>
        </div>

        <div className="card">
          <h3>Charging</h3>
          <h2>
            {loading ? "..." : chargingCount}
          </h2>
          <p>Currently charging</p>
        </div>

        <div className="card">
          <h3>Attention</h3>
          <h2>
            {loading ? "..." : attentionCount}
          </h2>
          <p>Requires attention</p>
        </div>

      </div>

      {/* STATION LIST */}
      <div className="section">

        <div className="section-heading">

          <h2>
            Docking Station Status
          </h2>

          <span>
            {stations.length} stations
          </span>

        </div>

        {loading ? (

          <p>
            Loading docking station data...
          </p>

        ) : (

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >

            {stations.map((station) => (

              <div
                key={station.id}
                className="card"
              >

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >

                  <div>

                    <h3
                      style={{
                        color: "#111827",
                        fontSize: "20px",
                        marginBottom: "5px",
                      }}
                    >
                      🔋 {station.id}
                    </h3>

                    <p>
                      📍 {station.location}
                    </p>

                  </div>

                  <strong>
                    {station.status}
                  </strong>

                </div>

                <p>
                  <strong>Connected Drone:</strong>{" "}
                  {station.drone}
                </p>

                <p>
                  <strong>Temperature:</strong>{" "}
                  {station.temperature}°C
                </p>

                <p>
                  <strong>Battery:</strong>{" "}
                  {station.battery}%
                </p>

                <div
                  className="progress-bar"
                  style={{
                    marginTop: "10px",
                    marginBottom: "15px",
                  }}
                >
                  <div
                    className="progress-fill"
                    style={{
                      width: `${station.battery}%`,
                    }}
                  ></div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >

                  {station.status === "Attention" && (

                    <button
                      className="view-button"
                      onClick={() =>
                        restartStation(station.id)
                      }
                    >
                      🔄 Restart
                    </button>

                  )}

                  <button
                    className="view-button"
                    onClick={() =>
                      setSelectedStation(station)
                    }
                  >
                    View Details
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* DETAILS POPUP */}
      {selectedStation && (

        <div className="modal-overlay">

          <div className="modal-box">

            <h2>
              🔋 Docking Station Details
            </h2>

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
              <strong>Drone:</strong>{" "}
              {selectedStation.drone}
            </p>

            <p>
              <strong>Battery:</strong>{" "}
              {selectedStation.battery}%
            </p>

            <p>
              <strong>Temperature:</strong>{" "}
              {selectedStation.temperature}°C
            </p>

            <button
              className="view-button"
              onClick={() =>
                setSelectedStation(null)
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

export default DockingStations;