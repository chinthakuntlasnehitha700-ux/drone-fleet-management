import { useState } from 'react'

function DockingStations() {
  const [stations, setStations] = useState([
    {
      id: 'DS-001',
      name: 'Main Campus Dock',
      location: 'Zone A',
      status: 'Available',
      drone: 'None',
      battery: 92,
      temperature: 28
    },
    {
      id: 'DS-002',
      name: 'Zone B Dock',
      location: 'Zone B',
      status: 'Attention',
      drone: 'DR-007',
      battery: 34,
      temperature: 34
    },
    {
      id: 'DS-003',
      name: 'Zone C Dock',
      location: 'Zone C',
      status: 'Charging',
      drone: 'DR-003',
      battery: 24,
      temperature: 30
    },
    {
      id: 'DS-004',
      name: 'Zone D Dock',
      location: 'Zone D',
      status: 'Available',
      drone: 'None',
      battery: 88,
      temperature: 27
    }
  ])

  const [selectedStation, setSelectedStation] = useState(null)

  const getStatusClass = (status) => {
    if (status === 'Available') return 'dock-available'
    if (status === 'Charging') return 'dock-charging'
    if (status === 'Attention') return 'dock-attention'
    return ''
  }

  const releaseDrone = (id) => {
    setStations(
      stations.map((station) =>
        station.id === id
          ? {
              ...station,
              status: 'Available',
              drone: 'None'
            }
          : station
      )
    )
  }

  return (
    <div className="docking-page">

      <div className="module-header">
        <div>
          <h2>Docking Stations</h2>
          <p>Monitor charging stations and drone docking activity.</p>
        </div>

        <button className="primary-button">
          + Add Station
        </button>
      </div>

      {/* SUMMARY */}

      <div className="dock-summary">

        <div className="dock-summary-card">
          <span>Total Stations</span>
          <strong>{stations.length}</strong>
        </div>

        <div className="dock-summary-card">
          <span>Available</span>
          <strong>
            {stations.filter((s) => s.status === 'Available').length}
          </strong>
        </div>

        <div className="dock-summary-card">
          <span>Charging</span>
          <strong>
            {stations.filter((s) => s.status === 'Charging').length}
          </strong>
        </div>

        <div className="dock-summary-card">
          <span>Attention Required</span>
          <strong>
            {stations.filter((s) => s.status === 'Attention').length}
          </strong>
        </div>

      </div>

      {/* STATION CARDS */}

      <div className="dock-grid">

        {stations.map((station) => (

          <div
            className="dock-card"
            key={station.id}
          >

            <div className="dock-card-header">

              <div>
                <h3>{station.name}</h3>
                <span>{station.id}</span>
              </div>

              <span
                className={`dock-status ${getStatusClass(
                  station.status
                )}`}
              >
                {station.status}
              </span>

            </div>

            <div className="dock-location">
              📍 {station.location}
            </div>

            <div className="dock-info-grid">

              <div>
                <span>Connected Drone</span>
                <strong>{station.drone}</strong>
              </div>

              <div>
                <span>Temperature</span>
                <strong>{station.temperature}°C</strong>
              </div>

              <div>
                <span>Battery</span>
                <strong>{station.battery}%</strong>
              </div>

              <div>
                <span>Power</span>
                <strong>
                  {station.status === 'Charging'
                    ? 'Charging'
                    : 'Standby'}
                </strong>
              </div>

            </div>

            <div className="dock-battery">

              <div className="dock-battery-label">
                <span>Battery Level</span>
                <strong>{station.battery}%</strong>
              </div>

              <div className="dock-battery-track">
                <div
                  className="dock-battery-fill"
                  style={{
                    width: `${station.battery}%`
                  }}
                ></div>
              </div>

            </div>

            <div className="dock-actions">

              <button
                className="dock-view-button"
                onClick={() => setSelectedStation(station)}
              >
                View Details
              </button>

              {station.drone !== 'None' && (
                <button
                  className="dock-release-button"
                  onClick={() => releaseDrone(station.id)}
                >
                  Release Drone
                </button>
              )}

            </div>

          </div>

        ))}

      </div>

      {/* DETAILS */}

      {selectedStation && (

        <div className="dock-details-overlay">

          <div className="dock-details">

            <button
              className="dock-close"
              onClick={() => setSelectedStation(null)}
            >
              ×
            </button>

            <h2>{selectedStation.name}</h2>

            <p className="details-id">
              Station ID: {selectedStation.id}
            </p>

            <div className="details-list">

              <p>
                <strong>Location:</strong>{' '}
                {selectedStation.location}
              </p>

              <p>
                <strong>Status:</strong>{' '}
                {selectedStation.status}
              </p>

              <p>
                <strong>Connected Drone:</strong>{' '}
                {selectedStation.drone}
              </p>

              <p>
                <strong>Battery:</strong>{' '}
                {selectedStation.battery}%
              </p>

              <p>
                <strong>Temperature:</strong>{' '}
                {selectedStation.temperature}°C
              </p>

            </div>

            <button
              className="primary-button"
              onClick={() => setSelectedStation(null)}
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  )
}

export default DockingStations