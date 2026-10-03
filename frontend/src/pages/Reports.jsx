import { useEffect, useState } from 'react'
import { apiFetch } from '../api'

function Reports() {
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadReport()
  }, [])

  const loadReport = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await apiFetch('/api/reports')

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.detail || 'Failed to fetch reports')
      }

      const data = await response.json()

      setReport(data)
    } catch (error) {
      console.error(error)
      setError(error.message || 'Unable to connect to backend')
      setReport(null)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="reports-page">
        <div className="loading-message">
          Loading reports...
        </div>
      </div>
    )
  }

  return (
    <div className="reports-page">

      <div className="module-header">
        <div>
          <h2>Fleet Reports</h2>
          <p>
            View operational statistics and fleet performance.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={loadReport}
        >
          Refresh Reports
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {!error && report && (
        <>
          <div className="mission-summary">

            <div className="summary-card">
              <h3>Total Drones</h3>
              <strong>
                {report.total_drones}
              </strong>
            </div>

            <div className="summary-card">
              <h3>Total Missions</h3>
              <strong>
                {report.total_missions}
              </strong>
            </div>

            <div className="summary-card">
              <h3>Completed Missions</h3>
              <strong>
                {report.completed_missions}
              </strong>
            </div>

            <div className="summary-card">
              <h3>Active Missions</h3>
              <strong>
                {report.active_missions}
              </strong>
            </div>

            <div className="summary-card">
              <h3>Total Alerts</h3>
              <strong>
                {report.total_alerts}
              </strong>
            </div>

          </div>

          <div className="reports-grid">

            <div className="report-card">
              <div className="report-card-header">
                <h3>Fleet Performance</h3>
              </div>

              <p>
                <strong>Active Drones:</strong>{' '}
                {report.active_drones}
              </p>

              <p>
                <strong>Returning Drones:</strong>{' '}
                {report.returning_drones}
              </p>

              <p>
                <strong>Charging Drones:</strong>{' '}
                {report.charging_drones}
              </p>

              <p>
                <strong>Offline Drones:</strong>{' '}
                {report.offline_drones}
              </p>
            </div>

            <div className="report-card">
              <div className="report-card-header">
                <h3>Mission Performance</h3>
              </div>

              <p>
                <strong>Completed:</strong>{' '}
                {report.completed_missions}
              </p>

              <p>
                <strong>Active:</strong>{' '}
                {report.active_missions}
              </p>

              <p>
                <strong>Total:</strong>{' '}
                {report.total_missions}
              </p>
            </div>

            <div className="report-card">
              <div className="report-card-header">
                <h3>Alert Summary</h3>
              </div>

              <p>
                <strong>Active Alerts:</strong>{' '}
                {report.active_alerts}
              </p>

              <p>
                <strong>Acknowledged Alerts:</strong>{' '}
                {report.acknowledged_alerts}
              </p>

              <p>
                <strong>Total Alerts:</strong>{' '}
                {report.total_alerts}
              </p>
            </div>

          </div>
        </>
      )}

      {!error && !report && (
        <div className="no-data-message">
          No report data available.
        </div>
      )}

    </div>
  )
}

export default Reports