import { useEffect, useState } from 'react'
import { apiFetch } from '../api'

function Battery() {
  const [drones, setDrones] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadBatteryData()
  }, [])

  const loadBatteryData = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await apiFetch('/api/drones')

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.detail || 'Failed to fetch battery data')
      }

      const data = await response.json()

      if (!Array.isArray(data)) {
        throw new Error('Invalid battery data received')
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

  const lowBattery = drones.filter((drone) => drone.battery <= 25)
  const mediumBattery = drones.filter(
    (drone) => drone.battery > 25 && drone.battery <= 50
  )
  const healthyBattery = drones.filter((drone) => drone.battery > 50)

  const averageBattery =
    drones.length > 0
      ? (
          drones.reduce((total, drone) => total + drone.battery, 0) /
          drones.length
        ).toFixed(1)
      : 0

  const getBatteryClass = (battery) => {
    if (battery <= 25) return 'battery-low'
    if (battery <= 50) return 'battery-medium'
    return 'battery-good'
  }

  return (
    <div className="battery-page">
      <div className="module-header">
        <div>
          <h2>Battery Monitoring</h2>
          <p>Monitor battery levels across the drone fleet.</p>
        </div>

        <button
          className="primary-button"
          onClick={loadBatteryData}
        >
          Refresh Battery Data
        </button>
      </div>

      {loading && (
        <div className="loading-message">
          Loading battery data...
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
              <h3>Total Drones</h3>
              <strong>{drones.length}</strong>
            </div>

            <div className="summary-card">
              <h3>Low Battery</h3>
              <strong>{lowBattery.length}</strong>
              <p>25% or below</p>
            </div>

            <div className="summary-card">
              <h3>Medium Battery</h3>
              <strong>{mediumBattery.length}</strong>
              <p>26% - 50%</p>
            </div>

            <div className="summary-card">
              <h3>Healthy Battery</h3>
              <strong>{healthyBattery.length}</strong>
              <p>Above 50%</p>
            </div>

            <div className="summary-card">
              <h3>Average Battery</h3>
              <strong>{averageBattery}%</strong>
            </div>

          </div>

          <div className="report-card">
            <div className="report-card-header">
              <h3>Drone Battery Status</h3>
            </div>

            {drones.length === 0 ? (
              <div className="no-data-message">
                No drone battery data available.
              </div>
            ) : (
              <div className="drone-table-container">
                <table className="drone-table">
                  <thead>
                    <tr>
                      <th>Drone ID</th>
                      <th>Model</th>
                      <th>Battery</th>
                      <th>Status</th>
                      <th>Location</th>
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
                          <div className="battery-container">

                            <div className="battery-bar">
                              <div
                                className={`battery-fill ${getBatteryClass(
                                  drone.battery
                                )}`}
                                style={{
                                  width: `${drone.battery}%`
                                }}
                              ></div>
                            </div>

                            <span>
                              {drone.battery}%
                            </span>

                          </div>
                        </td>

                        <td>
                          {drone.status}
                        </td>

                        <td>
                          📍 {drone.location}
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Battery