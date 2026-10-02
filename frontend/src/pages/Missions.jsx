import { useState } from 'react'

function Missions() {
  const [missions, setMissions] = useState([
    {
      id: 'MS-001',
      drone: 'DR-001',
      type: 'Delivery',
      location: 'Zone A',
      status: 'Active',
      progress: 72,
      priority: 'High'
    },
    {
      id: 'MS-002',
      drone: 'DR-002',
      type: 'Survey',
      location: 'Zone B',
      status: 'Active',
      progress: 48,
      priority: 'Medium'
    },
    {
      id: 'MS-003',
      drone: 'DR-003',
      type: 'Inspection',
      location: 'Zone C',
      status: 'Returning',
      progress: 86,
      priority: 'High'
    },
    {
      id: 'MS-004',
      drone: 'DR-004',
      type: 'Inspection',
      location: 'Zone D',
      status: 'Completed',
      progress: 100,
      priority: 'Low'
    }
  ])

  const [filter, setFilter] = useState('All')

  const filteredMissions =
    filter === 'All'
      ? missions
      : missions.filter((mission) => mission.status === filter)

  const cancelMission = (id) => {
    setMissions(
      missions.map((mission) =>
        mission.id === id
          ? { ...mission, status: 'Cancelled', progress: 0 }
          : mission
      )
    )
  }

  const getStatusClass = (status) => {
    if (status === 'Active') return 'mission-active'
    if (status === 'Completed') return 'mission-completed'
    if (status === 'Returning') return 'mission-returning'
    if (status === 'Cancelled') return 'mission-cancelled'
    return ''
  }

  const getPriorityClass = (priority) => {
    if (priority === 'High') return 'priority-high'
    if (priority === 'Medium') return 'priority-medium'
    return 'priority-low'
  }

  return (
    <div className="missions-page">

      <div className="module-header">
        <div>
          <h2>Mission Management</h2>
          <p>Create, monitor and manage drone missions.</p>
        </div>

        <button className="primary-button">
          + Create Mission
        </button>
      </div>

      <div className="mission-summary">

        <div className="mission-summary-card">
          <span>Total Missions</span>
          <strong>{missions.length}</strong>
        </div>

        <div className="mission-summary-card">
          <span>Active Missions</span>
          <strong>
            {missions.filter((m) => m.status === 'Active').length}
          </strong>
        </div>

        <div className="mission-summary-card">
          <span>Completed</span>
          <strong>
            {missions.filter((m) => m.status === 'Completed').length}
          </strong>
        </div>

        <div className="mission-summary-card">
          <span>High Priority</span>
          <strong>
            {missions.filter((m) => m.priority === 'High').length}
          </strong>
        </div>

      </div>

      <div className="mission-filter">

        <button
          className={filter === 'All' ? 'filter-active' : ''}
          onClick={() => setFilter('All')}
        >
          All
        </button>

        <button
          className={filter === 'Active' ? 'filter-active' : ''}
          onClick={() => setFilter('Active')}
        >
          Active
        </button>

        <button
          className={filter === 'Returning' ? 'filter-active' : ''}
          onClick={() => setFilter('Returning')}
        >
          Returning
        </button>

        <button
          className={filter === 'Completed' ? 'filter-active' : ''}
          onClick={() => setFilter('Completed')}
        >
          Completed
        </button>

        <button
          className={filter === 'Cancelled' ? 'filter-active' : ''}
          onClick={() => setFilter('Cancelled')}
        >
          Cancelled
        </button>

      </div>

      <div className="missions-table-container">

        <table className="missions-table">

          <thead>
            <tr>
              <th>Mission ID</th>
              <th>Drone</th>
              <th>Mission Type</th>
              <th>Location</th>
              <th>Progress</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredMissions.map((mission) => (

              <tr key={mission.id}>

                <td>
                  <strong>{mission.id}</strong>
                </td>

                <td>
                  🚁 {mission.drone}
                </td>

                <td>
                  {mission.type}
                </td>

                <td>
                  📍 {mission.location}
                </td>

                <td>

                  <div className="mission-progress">

                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${mission.progress}%`
                        }}
                      ></div>
                    </div>

                    <span>{mission.progress}%</span>

                  </div>

                </td>

                <td>
                  <span
                    className={`mission-status ${getStatusClass(
                      mission.status
                    )}`}
                  >
                    {mission.status}
                  </span>
                </td>

                <td>
                  <span
                    className={`priority-badge ${getPriorityClass(
                      mission.priority
                    )}`}
                  >
                    {mission.priority}
                  </span>
                </td>

                <td>

                  {mission.status === 'Active' ||
                  mission.status === 'Returning' ? (
                    <button
                      className="cancel-mission"
                      onClick={() => cancelMission(mission.id)}
                    >
                      Cancel
                    </button>
                  ) : (
                    <span className="no-action">
                      —
                    </span>
                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default Missions