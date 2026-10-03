import { useEffect, useState } from 'react'
import { apiFetch } from '../api'

function Alerts() {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadAlerts()
  }, [])

  const loadAlerts = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await apiFetch('/api/alerts')

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.detail || 'Failed to fetch alerts')
      }

      const data = await response.json()

      if (!Array.isArray(data)) {
        throw new Error('Invalid alert data received')
      }

      setAlerts(data)
    } catch (error) {
      console.error(error)
      setError(error.message || 'Unable to connect to backend')
      setAlerts([])
    } finally {
      setLoading(false)
    }
  }

  const acknowledgeAlert = async (id) => {
    try {
      setError('')

      const response = await apiFetch(`/api/alerts/${id}`, {
        method: 'PUT'
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.detail || 'Failed to acknowledge alert')
      }

      const updatedAlert = await response.json()

      setAlerts((currentAlerts) =>
        currentAlerts.map((alert) =>
          alert.id === updatedAlert.id
            ? updatedAlert
            : alert
        )
      )
    } catch (error) {
      console.error(error)
      setError(error.message || 'Unable to update alert')
    }
  }

  const activeAlerts = alerts.filter(
    (alert) => alert.status === 'Active'
  ).length

  const criticalAlerts = alerts.filter(
    (alert) => alert.severity === 'Critical'
  ).length

  const warningAlerts = alerts.filter(
    (alert) => alert.severity === 'Warning'
  ).length

  const acknowledgedAlerts = alerts.filter(
    (alert) => alert.status === 'Acknowledged'
  ).length

  const getSeverityClass = (severity) => {
    if (severity === 'Critical') return 'risk-high'
    if (severity === 'Warning') return 'risk-medium'
    return 'risk-low'
  }

  return (
    <div className="alerts-page">

      <div className="module-header">
        <div>
          <h2>Alerts & Notifications</h2>
          <p>
            Monitor important fleet alerts and notifications.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={loadAlerts}
        >
          Refresh Alerts
        </button>
      </div>

      {loading && (
        <div className="loading-message">
          Loading alerts...
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
              <h3>Total Alerts</h3>
              <strong>{alerts.length}</strong>
            </div>

            <div className="summary-card">
              <h3>Active</h3>
              <strong>{activeAlerts}</strong>
            </div>

            <div className="summary-card">
              <h3>Critical</h3>
              <strong>{criticalAlerts}</strong>
            </div>

            <div className="summary-card">
              <h3>Warnings</h3>
              <strong>{warningAlerts}</strong>
            </div>

            <div className="summary-card">
              <h3>Acknowledged</h3>
              <strong>{acknowledgedAlerts}</strong>
            </div>

          </div>

          <div className="alerts-list">

            {alerts.length === 0 ? (
              <div className="no-data-message">
                No alerts found.
              </div>
            ) : (
              alerts.map((alert) => (
                <div
                  className="alert-card"
                  key={alert.id}
                >

                  <div className="alert-header">

                    <div>
                      <h3>{alert.type}</h3>

                      <p>
                        {alert.id} • {alert.source}
                      </p>
                    </div>

                    <span
                      className={`risk-badge ${getSeverityClass(
                        alert.severity
                      )}`}
                    >
                      {alert.severity}
                    </span>

                  </div>

                  <div className="alert-message">
                    <p>{alert.message}</p>
                  </div>

                  <div className="alert-footer">

                    <span>
                      Status:{' '}
                      <strong>{alert.status}</strong>
                    </span>

                    {alert.status === 'Active' && (
                      <button
                        className="action-button"
                        onClick={() =>
                          acknowledgeAlert(alert.id)
                        }
                      >
                        Acknowledge
                      </button>
                    )}

                  </div>

                </div>
              ))
            )}

          </div>
        </>
      )}

    </div>
  )
}

export default Alerts