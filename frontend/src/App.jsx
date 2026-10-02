import { useState } from 'react'
import './App.css'

import Dashboard from './pages/Dashboard'
import Drones from './pages/Drones'
import LiveMap from './pages/LiveMap'
import Missions from './pages/Missions'
import Battery from './pages/Battery'
import DockingStations from './pages/DockingStations'
import AIPredictions from './pages/AIPredictions'
import Alerts from './pages/Alerts'
import Reports from './pages/Reports'
import Settings from './pages/Settings'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [activePage, setActivePage] = useState('Dashboard')

  const pages = {
    Dashboard: <Dashboard />,
    Drones: <Drones />,
    'Live Map': <LiveMap />,
    Missions: <Missions />,
    Battery: <Battery />,
    'Docking Stations': <DockingStations />,
    'AI Predictions': <AIPredictions />,
    Alerts: <Alerts />,
    Reports: <Reports />,
    Settings: <Settings />,
  }

  if (!loggedIn) {
    return (
      <div className="login-page">
        <div className="login-card">

          <div className="logo">🚁</div>

          <h1>DroneFleet AI</h1>

          <p className="subtitle">
            AI-Assisted Drone Fleet Management Platform
          </p>

          <div className="welcome">
            <h2>Welcome Back</h2>
            <p>Sign in to access your fleet control center</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              setLoggedIn(true)
            }}
          >
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              required
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              required
            />

            <button type="submit">
              Sign In
            </button>
          </form>

          <p className="footer-text">
            Secure • Intelligent • Scalable
          </p>

        </div>
      </div>
    )
  }

  return (
    <div className="dashboard">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="brand">
          🚁 <span>DroneFleet AI</span>
        </div>

        <nav>

          <button
            className={activePage === 'Dashboard' ? 'active' : ''}
            onClick={() => setActivePage('Dashboard')}
          >
            📊 Dashboard
          </button>

          <button
            className={activePage === 'Drones' ? 'active' : ''}
            onClick={() => setActivePage('Drones')}
          >
            🚁 Drones
          </button>

          <button
            className={activePage === 'Live Map' ? 'active' : ''}
            onClick={() => setActivePage('Live Map')}
          >
            🗺️ Live Map
          </button>

          <button
            className={activePage === 'Missions' ? 'active' : ''}
            onClick={() => setActivePage('Missions')}
          >
            📋 Missions
          </button>

          <button
            className={activePage === 'Battery' ? 'active' : ''}
            onClick={() => setActivePage('Battery')}
          >
            🔋 Battery
          </button>

          <button
            className={
              activePage === 'Docking Stations' ? 'active' : ''
            }
            onClick={() => setActivePage('Docking Stations')}
          >
            🏠 Docking Stations
          </button>

          <button
            className={
              activePage === 'AI Predictions' ? 'active' : ''
            }
            onClick={() => setActivePage('AI Predictions')}
          >
            🤖 AI Predictions
          </button>

          <button
            className={activePage === 'Alerts' ? 'active' : ''}
            onClick={() => setActivePage('Alerts')}
          >
            🔔 Alerts
          </button>

          <button
            className={activePage === 'Reports' ? 'active' : ''}
            onClick={() => setActivePage('Reports')}
          >
            📈 Reports
          </button>

          <button
            className={activePage === 'Settings' ? 'active' : ''}
            onClick={() => setActivePage('Settings')}
          >
            ⚙️ Settings
          </button>

        </nav>

        <button
          className="logout"
          onClick={() => setLoggedIn(false)}
        >
          🚪 Logout
        </button>

      </aside>

      {/* MAIN CONTENT */}

      <main className="main-content">

        <header>
          <div>
            <h1>{activePage}</h1>

            <p>
              DroneFleet AI Management Platform
            </p>
          </div>

          <div className="admin">
            👤 Admin
          </div>
        </header>

        <div>
          {pages[activePage]}
        </div>

      </main>

    </div>
  )
}

export default App