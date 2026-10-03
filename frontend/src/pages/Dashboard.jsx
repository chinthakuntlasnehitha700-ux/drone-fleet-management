import { useEffect, useState } from 'react'
import { apiFetch } from '../api'

function Dashboard() {
  const [drones, setDrones] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadDrones()
  }, [])

  const loadDrones = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await apiFetch('/api/drones')

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.detail || 'Failed to fetch drones')
      }

      const data = await response.json()

      if (!Array.isArray(data)) {
        throw new Error('Invalid drone data received from backend')
      }

      setDrones(data)

    } catch (error) {
      console.error(error)
      setError(error.message || 'Unable to connect to backend')
      setDrones([])
    } finally {
      setLoading(false)
    }
  }

  const totalDrones = drones.length

  const activeDrones = drones.filter(
    (drone) => drone.status === 'Online'
  ).length

  const returningDrones = drones.filter(
    (drone) => drone.status === 'Returning'
  ).length

  const chargingDrones = drones.filter(
    (drone) => drone.status === 'Charging'
  ).length

  const offlineDrones = drones.filter(
    (drone) => drone.status === 'Offline'
  ).length

  const lowBatteryDrones = drones.filter(
    (drone) => drone.battery <= 25
  ).length

  const mediumBatteryDrones = drones.filter(
    (drone) => drone.battery > 25 && drone.battery <= 50
  ).length

  const healthyBatteryDrones = drones.filter(
    (drone) => drone.battery > 50
  ).length

  const activePercentage =
    totalDrones > 0
      ? ((activeDrones / totalDrones) * 100).toFixed(1)
      : 0

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="loading-message">
          Loading fleet dashboard...
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-page">

      <div className="module-header">
        <div>
          <h2>Fleet Dashboard</h2>
          <p>
            Monitor your drone fleet and operational status.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={loadDrones}
        >
          Refresh Dashboard
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="mission-summary">

        <div className="summary-card">
          <h3>Total Drones</h3>
          <strong>{totalDrones}</strong>
        </div>

        <div className="summary-card">
          <h3>Active Drones</h3>
          <strong>{activeDrones}</strong>
          <p>{activePercentage}% active</p>
        </div>

        <div className="summary-card">
          <h3>Returning</h3>
          <strong>{returningDrones}</strong>
        </div>

        <div className="summary-card">
          <h3>Charging</h3>
          <strong>{chargingDrones}</strong>
        </div>

        <div className="summary-card">
          <h3>Offline</h3>
          <strong>{offlineDrones}</strong>
        </div>

      </div>

      <div className="mission-summary">

        <div className="summary-card">
          <h3>Low Battery</h3>
          <strong>{lowBatteryDrones}</strong>
          <p>25% or below</p>
        </div>

        <div className="summary-card">
          <h3>Medium Battery</h3>
          <strong>{mediumBatteryDrones}</strong>
          <p>26% - 50%</p>
        </div>

        <div className="summary-card">
          <h3>Healthy Battery</h3>
          <strong>{healthyBatteryDrones}</strong>
          <p>Above 50%</p>
        </div>

      </div>

      <div className="report-card">

        <div className="report-card-header">
          <h3>Current Fleet</h3>
        </div>

        {drones.length === 0 ? (
          <div className="no-data-message">
            No drone data available.
          </div>
        ) : (
          <div className="drone-table-container">

            <table className="drone-table">

              <thead>
                <tr>
                  <th>Drone ID</th>
                  <th>Model</th>
                  <th>Location</th>
                  <th>Battery</th>
                  <th>Status</th>
                  <th>Mission</th>
                </tr>
              </thead>

              <tbody>

                {drones.map((drone) => (
                  <tr key={drone.id}>

                    <td>
                      <strong>{drone.id}</strong>
                    </td>

                    <td>
                      {drone.model}
                    </td>

                    <td>
                      📍 {drone.location}
                    </td>

                    <td>
                      {drone.battery}%
                    </td>

                    <td>
                      {drone.status}
                    </td>

                    <td>
                      {drone.mission}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  )
}

export default Dashboard