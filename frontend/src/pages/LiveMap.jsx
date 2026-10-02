import { useState } from 'react'

function LiveMap() {
  const [selectedDrone, setSelectedDrone] = useState(null)

  const drones = [
    {
      id: 'DR-001',
      zone: 'Zone A',
      status: 'Online',
      battery: 92,
      mission: 'Delivery',
      x: '25%',
      y: '30%'
    },
    {
      id: 'DR-002',
      zone: 'Zone B',
      status: 'Online',
      battery: 76,
      mission: 'Survey',
      x: '68%',
      y: '25%'
    },
    {
      id: 'DR-003',
      zone: 'Zone C',
      status: 'Returning',
      battery: 24,
      mission: 'Inspection',
      x: '72%',
      y: '70%'
    },
    {
      id: 'DR-004',
      zone: 'Zone D',
      status: 'Online',
      battery: 88,
      mission: 'Inspection',
      x: '30%',
      y: '68%'
    }
  ]

  return (
    <div className="live-map-page">

      <div className="module-header">
        <div>
          <h2>Live Fleet Map</h2>
          <p>Monitor real-time drone locations and fleet activity.</p>
        </div>

        <div className="live-indicator">
          <span></span> Live Monitoring
        </div>
      </div>

      <div className="map-layout">

        {/* MAP */}
        <div className="map-container">

          <div className="map-top-bar">
            <strong>Drone Operations Area</strong>

            <div className="map-legend">
              <span>
                <i className="legend-online"></i>
                Online
              </span>

              <span>
                <i className="legend-returning"></i>
                Returning
              </span>

              <span>
                <i className="legend-low"></i>
                Low Battery
              </span>
            </div>
          </div>

          <div className="operations-map">

            <div className="zone zone-a">ZONE A</div>
            <div className="zone zone-b">ZONE B</div>
            <div className="zone zone-c">ZONE C</div>
            <div className="zone zone-d">ZONE D</div>

            <div className="map-road road-1"></div>
            <div className="map-road road-2"></div>
            <div className="map-road road-3"></div>

            <div className="docking-point">
              🏠
              <small>Main Dock</small>
            </div>

            {drones.map((drone) => (
              <button
                key={drone.id}
                className={`drone-marker ${
                  drone.status === 'Returning'
                    ? 'marker-returning'
                    : drone.battery <= 25
                    ? 'marker-low'
                    : 'marker-online'
                }`}
                style={{
                  left: drone.x,
                  top: drone.y
                }}
                onClick={() => setSelectedDrone(drone)}
              >
                🚁
              </button>
            ))}

            <div className="map-label campus-label">
              SR University Campus
            </div>

          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="map-side-panel">

          <div className="panel-title">
            <h3>Fleet Status</h3>
            <span>{drones.length} Active</span>
          </div>

          {drones.map((drone) => (
            <div
              key={drone.id}
              className="map-drone-card"
              onClick={() => setSelectedDrone(drone)}
            >
              <div className="drone-card-top">
                <strong>{drone.id}</strong>

                <span
                  className={`mini-status ${
                    drone.status === 'Online'
                      ? 'mini-online'
                      : 'mini-returning'
                  }`}
                >
                  {drone.status}
                </span>
              </div>

              <p>📍 {drone.zone}</p>

              <div className="map-battery">
                <span>Battery</span>
                <strong>{drone.battery}%</strong>
              </div>

              <div className="mini-battery">
                <div
                  style={{ width: `${drone.battery}%` }}
                  className={
                    drone.battery <= 25
                      ? 'mini-battery-low'
                      : 'mini-battery-good'
                  }
                ></div>
              </div>

              <small>Mission: {drone.mission}</small>
            </div>
          ))}

          {selectedDrone && (
            <div className="selected-drone">
              <h3>Selected Drone</h3>

              <p><strong>ID:</strong> {selectedDrone.id}</p>
              <p><strong>Zone:</strong> {selectedDrone.zone}</p>
              <p><strong>Status:</strong> {selectedDrone.status}</p>
              <p><strong>Battery:</strong> {selectedDrone.battery}%</p>
              <p><strong>Mission:</strong> {selectedDrone.mission}</p>

              <button
                className="close-button"
                onClick={() => setSelectedDrone(null)}
              >
                Close
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  )
}

export default LiveMap