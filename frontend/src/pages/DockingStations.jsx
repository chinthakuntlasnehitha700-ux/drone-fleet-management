import { useEffect, useState } from 'react'
import { apiFetch } from '../api'

function DockingStations() {
  const [stations, setStations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedStation, setSelectedStation] = useState(null)

  useEffect(() => {
    loadStations()
  }, [])

  const loadStations = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await apiFetch('/api/docking-stations')

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.detail || 'Failed to fetch docking stations')
      }

      const data = await response.json()

      if (!Array.isArray(data)) {
        throw new Error('Invalid docking station data received')
      }

      setStations(data)
    } catch (error) {
      console.error(error)
      setError(error.message || 'Unable to connect to backend')
      setStations([])
    } finally {
      setLoading(false)
    }
  }

  const availableStations = stations.filter(
    (station) => station.status === 'Available'
  ).length

  const chargingStations = stations.filter(
    (station) => station.status === 'Charging'
  ).length

  const attentionStations = stations.filter(
    (station) => station.status === 'Attention'
  ).length

  return (
    <div className="docking-page">

      <div className="module-header">
        <div>
          <h2>Docking Stations</h2>
          <p>Monitor drone docking and charging stations.</p>
        </div>

        <button
          className="primary-button"
          onClick={loadStations}
        >
          Refresh Stations
        </button>
      </div>

      {loading && (
        <div className="loading-message">
          Loading docking stations...
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
              <h3>Total Stations</h3>
              <strong>{stations.length}</strong>
            </div>

            <div className="summary-card">
              <h3>Available</h3>
              <strong>{availableStations}</strong>
            </div>

            <div className="summary-card">
              <h3>Charging</h3>
              <strong>{chargingStations}</strong>
            </div>

            <div className="summary-card">
              <h3>Attention</h3>
              <strong>{attentionStations}</strong>
            </div>

          </div>

          <div className="docking-stations-grid">

            {stations.map((station) => (
              <div
                className="docking-station-card"
                key={station.id}
              >

                <div className="report-card-header">
                  <h3>{station.id}</h3>

                  <span className="status-badge">
                    {station.status}
                  </span>
                </div>

                <p>
                  <strong>Location:</strong>{' '}
                  {station.location}
                </p>

                <p>
                  <strong>Battery:</strong>{' '}
                  {station.battery}%
                </p>

                <p>
                  <strong>Temperature:</strong>{' '}
                  {station.temperature}°C
                </p>

                <button
                  className="action-button"
                  onClick={() => setSelectedStation(station)}
                >
                  View Details
                </button>

              </div>
            ))}

          </div>

          {stations.length === 0 && (
            <div className="no-data-message">
              No docking stations found.
            </div>
          )}
        </>
      )}

      {selectedStation && (
        <div className="modal-overlay">

          <div className="modal-content">

            <div className="report-card-header">
              <h2>Docking Station Details</h2>

              <button
                className="action-button"
                onClick={() => setSelectedStation(null)}
              >
                Close
              </button>
            </div>

            <p>
              <strong>Station ID:</strong>{' '}
              {selectedStation.id}
            </p>

            <p>
              <strong>Location:</strong>{' '}
              {selectedStation.location}
            </p>

            <p>
              <strong>Status:</strong>{' '}
              {selectedStation.status}
            </p>

            <p>
              <strong>Battery:</strong>{' '}
              {selectedStation.battery}%
            </p>

            <p>
              <strong>Temperature:</strong>{' '}
              {selectedStation.temperature}°C
            </p>

            {selectedStation.drone_id && (
              <p>
                <strong>Connected Drone:</strong>{' '}
                {selectedStation.drone_id}
              </p>
            )}

          </div>

        </div>
      )}

    </div>
  )
}

export default DockingStations