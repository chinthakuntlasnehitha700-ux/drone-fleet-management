import { useEffect, useState } from 'react'
import { apiFetch } from '../api'

function Drones() {
  const [drones, setDrones] = useState([])
  const [search, setSearch] = useState('')
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
        throw new Error('Invalid drone data received')
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

  const filteredDrones = drones.filter((drone) =>
    drone.id.toLowerCase().includes(search.toLowerCase()) ||
    drone.model.toLowerCase().includes(search.toLowerCase()) ||
    drone.location.toLowerCase().includes(search.toLowerCase())
  )

  const getBatteryClass = (battery) => {
    if (battery <= 25) return 'battery-low'
    if (battery <= 50) return 'battery-medium'
    return 'battery-good'
  }

  const getStatusClass = (status) => {
    if (status === 'Online') return 'status-online'
    if (status === 'Returning') return 'status-returning'
    if (status === 'Charging') return 'status-charging'
    return ''
  }

  return (
    <div className="drones-page">

      <div className="module-header">
        <div>
          <h2>Drone Management</h2>
          <p>Monitor and manage your entire drone fleet.</p>
        </div>

        <button
          className="primary-button"
          onClick={loadDrones}
        >
          Refresh Drones
        </button>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search by drone ID, model or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && (
        <div className="loading-message">
          Loading drones...
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {!loading && !error && (
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
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredDrones.map((drone) => (
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
                    <div className="battery-container">

                      <div className="battery-bar">
                        <div
                          className={`battery-fill ${getBatteryClass(drone.battery)}`}
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
                    <span
                      className={`status-badge ${getStatusClass(drone.status)}`}
                    >
                      {drone.status}
                    </span>
                  </td>

                  <td>
                    {drone.mission}
                  </td>

                  <td>
                    <button className="action-button">
                      View
                    </button>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

      {!loading &&
        !error &&
        filteredDrones.length === 0 && (
          <div className="no-data-message">
            No drones found.
          </div>
        )}

    </div>
  )
}

export default Drones