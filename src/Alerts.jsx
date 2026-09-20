import { useEffect, useState } from "react";

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAlerts = () => {
    setLoading(true);

    fetch("http://127.0.0.1:8000/api/alerts")
      .then((response) => response.json())
      .then((data) => {
        setAlerts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Backend error:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  const acknowledgeAlert = (id) => {
    setAlerts(
      alerts.map((alertItem) =>
        alertItem.id === id
          ? {
              ...alertItem,
              status: "Acknowledged"
            }
          : alertItem
      )
    );
  };

  const clearAlert = (id) => {
    setAlerts(
      alerts.filter((alertItem) => alertItem.id !== id)
    );
  };

  const activeCount = alerts.filter(
    (alertItem) => alertItem.status === "Active"
  ).length;

  const criticalCount = alerts.filter(
    (alertItem) =>
      alertItem.level === "Critical" &&
      alertItem.status === "Active"
  ).length;

  const warningCount = alerts.filter(
    (alertItem) =>
      alertItem.level === "Warning" &&
      alertItem.status === "Active"
  ).length;

  const infoCount = alerts.filter(
    (alertItem) =>
      alertItem.level === "Info" &&
      alertItem.status === "Active"
  ).length;

  return (
    <div className="page">

      {/* HEADER */}
      <div className="top-header">

        <div>
          <h1>Alerts & Notifications</h1>

          <p>
            Monitor alerts and notifications from the backend.
          </p>
        </div>

        <button
          className="view-button"
          onClick={loadAlerts}
        >
          🔄 Refresh
        </button>

      </div>

      {/* STATISTICS */}
      <div className="cards">

        <div className="card">
          <h3>Active Alerts</h3>
          <h2>
            {loading ? "..." : activeCount}
          </h2>
          <p>Current active alerts</p>
        </div>

        <div className="card">
          <h3>Critical</h3>
          <h2>
            {loading ? "..." : criticalCount}
          </h2>
          <p>Immediate attention</p>
        </div>

        <div className="card">
          <h3>Warnings</h3>
          <h2>
            {loading ? "..." : warningCount}
          </h2>
          <p>System warnings</p>
        </div>

        <div className="card">
          <h3>Information</h3>
          <h2>
            {loading ? "..." : infoCount}
          </h2>
          <p>Informational alerts</p>
        </div>

      </div>

      {/* ALERT LIST */}
      <div className="section">

        <div className="section-heading">

          <h2>Recent Alerts</h2>

          <span>
            {loading ? "Loading..." : `${activeCount} active`}
          </span>

        </div>

        {loading ? (

          <p>Loading alert data...</p>

        ) : alerts.length === 0 ? (

          <div className="alert-box">
            ✅ No alerts available.
          </div>

        ) : (

          <div>

            {alerts.map((alertItem) => (

              <div
                key={alertItem.id}
                className="alert-box"
                style={{
                  marginBottom: "15px",
                  padding: "20px"
                }}
              >

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "20px",
                    alignItems: "center"
                  }}
                >

                  <div>

                    <h3
                      style={{
                        marginBottom: "8px",
                        color: "#111827"
                      }}
                    >
                      {alertItem.icon} {alertItem.title}
                    </h3>

                    <p
                      style={{
                        marginBottom: "8px"
                      }}
                    >
                      {alertItem.message}
                    </p>

                    <p
                      style={{
                        color: "#374151",
                        fontSize: "14px"
                      }}
                    >
                      <strong>Source:</strong>{" "}
                      {alertItem.source}{" "}
                      |{" "}
                      <strong>Time:</strong>{" "}
                      {alertItem.time}{" "}
                      |{" "}
                      <strong>Level:</strong>{" "}
                      {alertItem.level}
                    </p>

                    <p
                      style={{
                        marginTop: "8px",
                        fontWeight: "600"
                      }}
                    >
                      Status: {alertItem.status}
                    </p>

                  </div>

                  {/* ACTIONS */}
                  {alertItem.status === "Active" && (

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        flexShrink: 0
                      }}
                    >

                      <button
                        className="view-button"
                        onClick={() =>
                          acknowledgeAlert(alertItem.id)
                        }
                      >
                        ✓ Acknowledge
                      </button>

                      <button
                        className="view-button"
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

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Alerts;