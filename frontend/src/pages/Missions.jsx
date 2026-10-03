import { useEffect, useState } from 'react'
import { apiFetch } from '../api'

function Missions() {
  const [missions, setMissions] = useState([])
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadMissions()
  }, [])

  const loadMissions = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await apiFetch('/api/missions')

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.detail || 'Failed to fetch missions')
      }

      const data = await response.json()

      if (!Array.isArray(data)) {
        throw new Error('Invalid mission data received')
      }

      setMissions(data)
    } catch (error) {
      console.error(error)
      setError(error.message || 'Unable to connect to backend')
      setMissions([])
    } finally {
      setLoading(false)
    }
  }

  const filteredMissions =
    filter === 'All'
      ? missions
      : missions.filter(
          (mission) => mission.status === filter
        )

  const totalMissions = missions.length

  const activeMissions = missions.filter(
    (mission) => mission.status === 'Active'
  ).length

  const returningMissions = missions.filter(
    (mission) => mission.status === 'Returning'
  ).length

  const completedMissions = missions.filter(
    (mission) => mission.status === 'Completed'
  ).length

  return (
    <div className="missions-page">

      <div className="module-header">
        <div>
          <h2>Mission Management</h2>
          <p>
            Monitor and manage drone missions.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={loadMissions}
        >
          Refresh Missions
        </button>
      </div>

      {loading && (
        <div className="loading-message">
          Loading missions...
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
              <h3>Total Missions</h3>
              <strong>{totalMissions}</strong>
            </div>

            <div className="summary-card">
              <h3>Active</h3>
              <strong>{activeMissions}</strong>
            </div>

            <div className="summary-card">
              <h3>Returning</h3>
              <strong>{returningMissions}</strong>
            </div>

            <div className="summary-card">
              <h3>Completed</h3>
              <strong>{completedMissions}</strong>
            </div>

          </div>

          <div className="filter-buttons">

            {[
              'All',
              'Active',
              'Returning',
              'Completed'
            ].map((status) => (
              <button
                key={status}
                className={
                  filter === status
                    ? 'primary-button'
                    : 'action-button'
                }
                onClick={() => setFilter(status)}
              >
                {status}
              </button>
            ))}

          </div>

          <div className="mission-table-container">

            <table className="mission-table">

              <thead>
                <tr>
                  <th>Mission ID</th>
                  <th>Drone ID</th>
                  <th>Mission Type</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {filteredMissions.map((mission) => (
                  <tr key={mission.id}>

                    <td>
                      <strong>{mission.id}</strong>
                    </td>

                    <td>
                      {mission.drone_id}
                    </td>

                    <td>
                      {mission.mission_type}
                    </td>

                    <td>
                      📍 {mission.location}
                    </td>

                    <td>
                      <span className="status-badge">
                        {mission.status}
                      </span>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

          {filteredMissions.length === 0 && (
            <div className="no-data-message">
              No missions found.
            </div>
          )}

        </>
      )}

    </div>
  )
}

export default Missions