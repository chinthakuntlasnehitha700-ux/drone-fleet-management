import { useEffect, useState } from 'react'
import { apiFetch } from '../api'

function AIPredictions() {
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadPredictions()
  }, [])

  const loadPredictions = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await apiFetch('/api/ai-predictions')

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.detail || 'Failed to fetch AI predictions')
      }

      const data = await response.json()

      if (!Array.isArray(data)) {
        throw new Error('Invalid AI prediction data received')
      }

      setPredictions(data)
    } catch (error) {
      console.error(error)
      setError(error.message || 'Unable to connect to backend')
      setPredictions([])
    } finally {
      setLoading(false)
    }
  }

  const highRisk = predictions.filter(
    (prediction) => prediction.risk_level === 'High'
  ).length

  const mediumRisk = predictions.filter(
    (prediction) => prediction.risk_level === 'Medium'
  ).length

  const lowRisk = predictions.filter(
    (prediction) => prediction.risk_level === 'Low'
  ).length

  return (
    <div className="ai-predictions-page">

      <div className="module-header">
        <div>
          <h2>AI Predictions</h2>
          <p>
            AI-assisted analysis of drone fleet risks and conditions.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={loadPredictions}
        >
          Run AI Analysis
        </button>
      </div>

      {loading && (
        <div className="loading-message">
          Running AI analysis...
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="mission-summary">

            <div className="summary-card">
              <h3>Total Predictions</h3>
              <strong>{predictions.length}</strong>
            </div>

            <div className="summary-card">
              <h3>High Risk</h3>
              <strong>{highRisk}</strong>
            </div>

            <div className="summary-card">
              <h3>Medium Risk</h3>
              <strong>{mediumRisk}</strong>
            </div>

            <div className="summary-card">
              <h3>Low Risk</h3>
              <strong>{lowRisk}</strong>
            </div>

          </div>

          <div className="ai-predictions-grid">

            {predictions.map((prediction) => (
              <div
                className="report-card"
                key={prediction.id}
              >

                <div className="report-card-header">
                  <div>
                    <h3>
                      {prediction.drone_id}
                    </h3>

                    <p>
                      {prediction.prediction_type}
                    </p>
                  </div>

                  <span className="risk-badge">
                    {prediction.risk_level}
                  </span>
                </div>

                <p>
                  <strong>Prediction:</strong>{' '}
                  {prediction.prediction}
                </p>

                <p>
                  <strong>Confidence:</strong>{' '}
                  {prediction.confidence}%
                </p>

                <p>
                  <strong>Recommended Action:</strong>{' '}
                  {prediction.recommended_action}
                </p>

              </div>
            ))}

          </div>

          {predictions.length === 0 && (
            <div className="no-data-message">
              No AI predictions available.
            </div>
          )}
        </>
      )}

    </div>
  )
}

export default AIPredictions