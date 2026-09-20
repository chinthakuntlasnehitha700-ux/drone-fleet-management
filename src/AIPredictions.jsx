import React, { useState } from "react";

function AIPredictions() {
  const [predictions] = useState([
    {
      id: "AI-001",
      drone: "DR-001",
      type: "Battery",
      prediction: "Battery replacement may be required soon.",
      risk: "Medium",
      confidence: 87,
      recommendation:
        "Schedule battery inspection within the next 7 days.",
    },
    {
      id: "AI-002",
      drone: "DR-002",
      type: "Performance",
      prediction: "Normal flight performance is expected.",
      risk: "Low",
      confidence: 94,
      recommendation:
        "Continue regular monitoring and routine maintenance.",
    },
    {
      id: "AI-003",
      drone: "DR-003",
      type: "Battery",
      prediction: "Battery level may become critical during operation.",
      risk: "High",
      confidence: 91,
      recommendation:
        "Return the drone to the docking station for charging.",
    },
    {
      id: "AI-004",
      drone: "DR-004",
      type: "Maintenance",
      prediction: "Routine maintenance may be required.",
      risk: "Medium",
      confidence: 82,
      recommendation:
        "Schedule a maintenance inspection.",
    },
  ]);

  const [selectedPrediction, setSelectedPrediction] =
    useState(null);

  const lowRisk = predictions.filter(
    (prediction) => prediction.risk === "Low"
  ).length;

  const mediumRisk = predictions.filter(
    (prediction) => prediction.risk === "Medium"
  ).length;

  const highRisk = predictions.filter(
    (prediction) => prediction.risk === "High"
  ).length;

  const refreshPredictions = () => {
    alert("AI predictions refreshed successfully!");
  };

  return (
    <div className="page">

      {/* HEADER */}
      <div className="page-header">

        <div>
          <h1>AI Predictions</h1>

          <p>
            AI-assisted predictions and recommendations for your drone fleet.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={refreshPredictions}
        >
          🔄 Refresh Predictions
        </button>

      </div>

      {/* STATISTICS */}
      <div className="mission-stats">

        <div className="stat-card">
          <span>🤖</span>

          <div>
            <small>Total Predictions</small>
            <h2>{predictions.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span>🟢</span>

          <div>
            <small>Low Risk</small>
            <h2>{lowRisk}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span>⚠️</span>

          <div>
            <small>Medium Risk</small>
            <h2>{mediumRisk}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span>🔴</span>

          <div>
            <small>High Risk</small>
            <h2>{highRisk}</h2>
          </div>
        </div>

      </div>

      {/* PREDICTIONS */}
      <div className="missions-container">

        <div className="section-title">

          <div>
            <h2>Prediction Results</h2>

            <p>
              AI-generated insights for your drone fleet.
            </p>
          </div>

          <span>
            {predictions.length} predictions
          </span>

        </div>

        <div className="alert-list">

          {predictions.map((prediction) => (

            <div
              className={`alert-card ${prediction.risk.toLowerCase()}`}
              key={prediction.id}
            >

              {/* ICON */}
              <div className="alert-icon">
                🤖
              </div>

              {/* CONTENT */}
              <div className="alert-content">

                <div className="alert-title-row">

                  <div>

                    <span
                      className={`alert-level ${prediction.risk.toLowerCase()}`}
                    >
                      {prediction.risk} Risk
                    </span>

                    <h3>
                      {prediction.prediction}
                    </h3>

                  </div>

                  <span className="alert-status">
                    {prediction.drone}
                  </span>

                </div>

                <p>
                  <strong>Prediction Type:</strong>{" "}
                  {prediction.type}
                </p>

                <p>
                  <strong>Confidence:</strong>{" "}
                  {prediction.confidence}%
                </p>

                <div className="progress-bar">

                  <div
                    className="progress-fill"
                    style={{
                      width: `${prediction.confidence}%`,
                    }}
                  ></div>

                </div>

                <p>
                  <strong>Recommendation:</strong>{" "}
                  {prediction.recommendation}
                </p>

                <div className="alert-actions">

                  <button
                    className="view-btn"
                    onClick={() =>
                      setSelectedPrediction(prediction)
                    }
                  >
                    View Details
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* DETAILS POPUP */}
      {selectedPrediction && (

        <div className="modal-overlay">

          <div className="modal-box">

            <h2>🤖 AI Prediction Details</h2>

            <p>
              <strong>Prediction ID:</strong>{" "}
              {selectedPrediction.id}
            </p>

            <p>
              <strong>Drone:</strong>{" "}
              {selectedPrediction.drone}
            </p>

            <p>
              <strong>Type:</strong>{" "}
              {selectedPrediction.type}
            </p>

            <p>
              <strong>Prediction:</strong>{" "}
              {selectedPrediction.prediction}
            </p>

            <p>
              <strong>Risk:</strong>{" "}
              {selectedPrediction.risk}
            </p>

            <p>
              <strong>Confidence:</strong>{" "}
              {selectedPrediction.confidence}%
            </p>

            <p>
              <strong>Recommendation:</strong>{" "}
              {selectedPrediction.recommendation}
            </p>

            <button
              className="primary-btn"
              onClick={() =>
                setSelectedPrediction(null)
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

export default AIPredictions;