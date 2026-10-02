function Dashboard() {
  return (
    <div className="dashboard-page">

      {/* STAT CARDS */}

      <section className="stats">

        <div className="stat-card">
          <span>Total Drones</span>
          <h2>12</h2>
          <p>+2 this month</p>
        </div>

        <div className="stat-card">
          <span>Active Drones</span>
          <h2>8</h2>
          <p>66.7% of fleet</p>
        </div>

        <div className="stat-card">
          <span>Active Missions</span>
          <h2>5</h2>
          <p>2 need attention</p>
        </div>

        <div className="stat-card">
          <span>Fleet Health</span>
          <h2>92%</h2>
          <p>+4.2% this month</p>
        </div>

      </section>


      {/* FLEET STATUS + AI RISK */}

      <section className="content-grid">

        <div className="panel">

          <h2>Fleet Status</h2>

          <div className="status-row">
            <span>🟢 Online</span>
            <strong>8</strong>
          </div>

          <div className="status-row">
            <span>🔵 Returning</span>
            <strong>2</strong>
          </div>

          <div className="status-row">
            <span>🟡 Charging</span>
            <strong>1</strong>
          </div>

          <div className="status-row">
            <span>🔴 Offline</span>
            <strong>1</strong>
          </div>

        </div>


        <div className="panel">

          <h2>AI Risk Overview</h2>

          <div className="risk">

            <div>
              <span>Low Risk</span>
              <strong>3</strong>
            </div>

            <div>
              <span>Medium Risk</span>
              <strong>1</strong>
            </div>

            <div>
              <span>High Risk</span>
              <strong>1</strong>
            </div>

          </div>

        </div>

      </section>


      {/* REPORTS */}

      <section className="content-grid">

        <div className="panel">

          <h2>Mission Performance</h2>

          <div className="status-row">
            <span>Completed Missions</span>
            <strong>148</strong>
          </div>

          <div className="status-row">
            <span>Flight Hours</span>
            <strong>326.5</strong>
          </div>

          <div className="status-row">
            <span>Average Fleet Health</span>
            <strong>92%</strong>
          </div>

        </div>


        <div className="panel">

          <h2>Recent Alerts</h2>

          <div className="alert-item">
            🔴 <span>DR-003 Low Battery</span>
          </div>

          <div className="alert-item">
            🟡 <span>DR-007 Weak Signal</span>
          </div>

          <div className="alert-item">
            🔵 <span>DS-02 Maintenance Required</span>
          </div>

        </div>

      </section>

    </div>
  )
}

export default Dashboard