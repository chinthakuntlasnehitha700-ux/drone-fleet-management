import { useState } from 'react'

function Drones() {

  const [drones, setDrones] = useState([
    {
      id: 'DR-001',
      model: 'DJI Matrice 350',
      location: 'Zone A',
      battery: 92,
      status: 'Online',
      mission: 'Delivery'
    },
    {
      id: 'DR-002',
      model: 'DJI Mavic 3',
      location: 'Zone B',
      battery: 76,
      status: 'Online',
      mission: 'Survey'
    },
    {
      id: 'DR-003',
      model: 'Autel EVO II',
      location: 'Zone C',
      battery: 24,
      status: 'Returning',
      mission: 'Inspection'
    },
    {
      id: 'DR-004',
      model: 'DJI Matrice 300',
      location: 'Zone A',
      battery: 88,
      status: 'Online',
      mission: 'Inspection'
    },
    {
      id: 'DR-005',
      model: 'DJI Mavic 3 Enterprise',
      location: 'Zone D',
      battery: 61,
      status: 'Charging',
      mission: 'None'
    },
    {
      id: 'DR-006',
      model: 'DJI Matrice 350',
      location: 'Zone B',
      battery: 45,
      status: 'Online',
      mission: 'Survey'
    }
  ])

  const [search, setSearch] = useState('')

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

  const deleteDrone = (id) => {
    setDrones(drones.filter((drone) => drone.id !== id))
  }

  return (
    <div className="drones-page">

      {/* HEADER */}

      <div className="module-header">

        <div>
          <h2>Drone Management</h2>
          <p>Monitor and manage your entire drone fleet.</p>
        </div>

        <button className="primary-button">
          + Add Drone
        </button>

      </div>


      {/* SEARCH */}

      <div className="search-section">

        <input
          type="text"
          placeholder="Search by drone ID, model or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>


      {/* DRONE TABLE */}

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

                  <button
                    className="action-button"
                    onClick={() => deleteDrone(drone.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default Drones