import { useEffect, useState } from "react";

function AIPredictions() {
  const [predictions, setPredictions] = useState([]);
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadPredictions = () => {
    setLoading(true);

    fetch("http://127.0.0.1:8000/api/ai-predictions")
      .then((response) => response.json())
      .then((data) => {
        setPredictions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("AI prediction error:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadPredictions();
  }, []);

  const lowRisk = predictions.filter(
    (item) => item.risk === "Low"
  ).length;

  const mediumRisk = predictions.filter(
    (item) => item.risk === "Medium"
  ).length;

  const highRisk = predictions.filter(
    (item) => item.risk === "High"
  ).length;

  return (
    <div className="page">

      {/* HEADER */}
      <div className="top-header">

        <div>
          <h1>AI Predictions</h1>

          <p>
            AI-assisted drone risk analysis and recommendations.
          </p>
        </div>

        <button
          className="view-button"
          onClick={loadPredictions}
        >
          🔄 Refresh Predictions
        </button>

      </div>

      {/* STATISTICS */}
      <div className="cards">

        <div className="card">
          <h3>Total Predictions</h3>
          <h2>
            {loading ? "..." : predictions.length}
          </h2>
          <p>Backend analysis results</p>
        </div>

        <div className="card">
          <h3>Low Risk</h3>
          <h2>
            {loading ? "..." : lowRisk}
          </h2>
          <p>Normal condition</p>
        </div>

        <div className="card">
          <h3>Medium Risk</h3>
          <h2>
            {loading ? "..." : mediumRisk}
          </h2>
          <p>Needs monitoring</p>
        </div>

        <div className="card">
          <h3>High Risk</h3>
          <h2>
            {loading ? "..." : highRisk}
          </h2>
          <p>Needs attention</p>
        </div>

      </div>

      {/* PREDICTIONS */}
      <div className="section">

        <div className="section-heading">

          <h2>
            AI Risk Predictions
          </h2>

          <span>
            {predictions.length} predictions
          </span>

        </div>

        {loading ? (

          <p>
            Loading AI predictions...
          </p>

        ) : (

          <div>

            {predictions.map((item) => (

              <div
                className="alert-box"
                key={item.id}
                style={{
                  marginBottom: "18px",
                  padding: "20px"
                }}
              >

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "20px"
                  }}
                >

                  <div>

                    <h3
                      style={{
                        color: "#111827",
                        marginBottom: "8px"
                      }}
                    >
                      🤖 {item.drone}
                    </h3>

                    <p
                      style={{
                        marginBottom: "8px"
                      }}
                    >
                      {item.prediction}
                    </p>

                    <p
                      style={{
                        color: "#374151",
                        marginBottom: "6px"
                      }}
                    >
                      <strong>Risk:</strong>{" "}
                      {item.risk}
                    </p>

                    <p
                      style={{
                        color: "#374151",
                        marginBottom: "6px"
                      }}
                    >
                      <strong>Confidence:</strong>{" "}
                      {item.confidence}%
                    </p>

                    <div
                      className="progress-bar"
                      style={{
                        maxWidth: "300px",
                        marginBottom: "10px"
                      }}
                    >

                      <div
                        className="progress-fill"
                        style={{
                          width: `${item.confidence}%`
                        }}
                      ></div>

                    </div>

                    <p
                      style={{
                        color: "#374151"
                      }}
                    >
                      <strong>Recommendation:</strong>{" "}
                      {item.recommendation}
                    </p>

                  </div>

                  <button
                    className="view-button"
                    onClick={() =>
                      setSelectedPrediction(item)
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
      {selectedPrediction && (

        <div className="modal-overlay">

          <div className="modal-box">

            <h2>
              🤖 AI Prediction Details
            </h2>

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
              className="view-button"
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