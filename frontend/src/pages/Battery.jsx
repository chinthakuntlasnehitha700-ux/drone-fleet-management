import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js'

import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
)

function Battery() {
  const drones = [
    {
      id: 'DR-001',
      model: 'DJI Matrice 350',
      battery: 92,
      status: 'Healthy',
      flightHours: 128
    },
    {
      id: 'DR-002',
      model: 'DJI Mavic 3',
      battery: 76,
      status: 'Healthy',
      flightHours: 96
    },
    {
      id: 'DR-003',
      model: 'Autel EVO II',
      battery: 24,
      status: 'Critical',
      flightHours: 142
    },
    {
      id: 'DR-004',
      model: 'DJI Matrice 300',
      battery: 88,
      status: 'Healthy',
      flightHours: 114
    },
    {
      id: 'DR-005',
      model: 'DJI Mavic 3 Enterprise',
      battery: 61,
      status: 'Moderate',
      flightHours: 87
    },
    {
      id: 'DR-006',
      model: 'DJI Matrice 350',
      battery: 45,
      status: 'Moderate',
      flightHours: 105
    }
  ]

  const chartData = {
    labels: drones.map((drone) => drone.id),
    datasets: [
      {
        label: 'Battery Level (%)',
        data: drones.map((drone) => drone.battery),
        borderWidth: 1
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  }

  return (
    <div className="battery-page">

      <div className="module-header">
        <div>
          <h2>Battery Management</h2>
          <p>Monitor battery health and flight power across the fleet.</p>
        </div>

        <div className="battery-refresh">
          ● Monitoring Active
        </div>
      </div>

      {/* SUMMARY */}

      <div className="battery-summary">

        <div className="battery-summary-card">
          <span>Average Battery</span>
          <strong>64.3%</strong>
          <small>Across active fleet</small>
        </div>

        <div className="battery-summary-card">
          <span>Healthy Batteries</span>
          <strong>3</strong>
          <small>Above 70%</small>
        </div>

        <div className="battery-summary-card">
          <span>Moderate</span>
          <strong>2</strong>
          <small>Between 30–70%</small>
        </div>

        <div className="battery-summary-card critical-card">
          <span>Critical</span>
          <strong>1</strong>
          <small>Below 30%</small>
        </div>

      </div>

      {/* ALERT */}

      <div className="battery-alert">
        <div className="battery-alert-icon">
          ⚠️
        </div>

        <div>
          <strong>Low Battery Alert</strong>
          <p>
            DR-003 battery level is critically low at 24%.
            Return-to-dock is recommended.
          </p>
        </div>
      </div>

      {/* CHART */}

      <div className="battery-chart-card">

        <div className="battery-section-title">
          <div>
            <h3>Fleet Battery Levels</h3>
            <p>Current battery percentage for each drone.</p>
          </div>
        </div>

        <div className="battery-chart">
          <Bar data={chartData} options={chartOptions} />
        </div>

      </div>

      {/* TABLE */}

      <div className="battery-table-card">

        <h3>Battery Details</h3>

        <div className="battery-table-container">

          <table className="battery-table">

            <thead>
              <tr>
                <th>Drone</th>
                <th>Model</th>
                <th>Battery</th>
                <th>Health Status</th>
                <th>Flight Hours</th>
              </tr>
            </thead>

            <tbody>

              {drones.map((drone) => (

                <tr key={drone.id}>

                  <td>
                    <strong>{drone.id}</strong>
                  </td>

                  <td>{drone.model}</td>

                  <td>

                    <div className="battery-level">

                      <div className="battery-track">
                        <div
                          className={
                            drone.battery <= 30
                              ? 'battery-danger'
                              : drone.battery <= 70
                              ? 'battery-warning'
                              : 'battery-safe'
                          }
                          style={{
                            width: `${drone.battery}%`
                          }}
                        ></div>
                      </div>

                      <span>{drone.battery}%</span>

                    </div>

                  </td>

                  <td>

                    <span
                      className={`battery-status ${
                        drone.status === 'Healthy'
                          ? 'battery-status-good'
                          : drone.status === 'Moderate'
                          ? 'battery-status-warning'
                          : 'battery-status-danger'
                      }`}
                    >
                      {drone.status}
                    </span>

                  </td>

                  <td>{drone.flightHours} hrs</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}

export default Battery