import { useEffect, useState } from 'react'
import { apiFetch } from '../api'

function LiveMap() {
  const [drones, setDrones] = useState([])
  const [selectedDrone, setSelectedDrone] = useState(null)
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
        throw new Error(data.detail || 'Failed to fetch drone locations')
      }

      const data = await response.json()

      if (!Array.isArray(data)) {
        throw new Error('Invalid drone location data received')
      }

      setDrones(data)

      if (data.length > 0) {
        setSelectedDrone(data[0])
      }
    } catch (error) {
      console.error(error)
      setError(error.message || 'Unable to connect to backend')
      setDrones([])
    } finally {
      setLoading(false)
    }
  }

  const getStatusClass = (status) => {
    if (status === 'Online') return 'status-online'
    if (status === 'Returning') return 'status-returning'
    if (status === 'Charging') return 'status-charging'
    return ''
  }

  return (
    <div className="live-map-page">

      <div className="module-header">
        <div>
          <h2>Live Drone Map</h2>
          <p>Monitor current drone locations and operational status.</p>
        </div>

        <button
          className="primary-button"
          onClick={loadDrones}
        >
          Refresh Locations
        </button>
      </div>

      {loading && (
        <div className="loading-message">
          Loading live drone locations...
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="live-map-layout">

          <div className="operations-map">

            <div className="panel-header">
              <h3>Fleet Location Overview</h3>
            </div>

            <div className="fleet-map-panel">

              {drones.length === 0 ? (
                <div className="no-data-message">
                  No drone location data available.
                </div>
              ) : (
                drones.map((drone, index) => (
                  <button
                    key={drone.id}
                    className="map-drone-item"
                    onClick={() => setSelectedDrone(drone)}
                  >
                    <span className="drone-map-icon">
                      🚁
                    </span>

                    <span>
                      <strong>{drone.id}</strong>
                      <br />
                      {drone.location}
                    </span>

                    <span
                      className={`status-badge ${getStatusClass(
                        drone.status
                      )}`}
                    >
                      {drone.status}
                    </span>
                  </button>
                ))
              )}

            </div>

          </div>

          <div className="selected-drone-details">

            <div className="panel-header">
              <h3>Selected Drone</h3>
            </div>

            {selectedDrone ? (
              <div>

                <h2>{selectedDrone.id}</h2>

                <p>
                  <strong>Model:</strong>{' '}
                  {selectedDrone.model}
                </p>

                <p>
                  <strong>Location:</strong>{' '}
                  {selectedDrone.location}
                </p>

                <p>
                  <strong>Battery:</strong>{' '}
                  {selectedDrone.battery}%
                </p>

                <p>
                  <strong>Status:</strong>{' '}
                  {selectedDrone.status}
                </p>

                <p>
                  <strong>Mission:</strong>{' '}
                  {selectedDrone.mission}
                </p>

                <button
                  className="primary-button"
                  onClick={loadDrones}
                >
                  Refresh Drone
                </button>

              </div>
            ) : (
              <div className="no-data-message">
                Select a drone to view details.
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  )
}

export default LiveMap