import { useEffect, useState } from 'react'
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

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loginError, setLoginError] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)

  // Check whether a JWT already exists
  useEffect(() => {
    const token = localStorage.getItem('access_token')

    if (token) {
      setLoggedIn(true)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    setLoginError('')
    setLoggingIn(true)

    try {
      const response = await fetch(
        'http://127.0.0.1:8000/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.detail || 'Invalid email or password'
        )
      }

      // Save JWT token
      localStorage.setItem(
        'access_token',
        data.access_token
      )

      // Save logged-in user
      localStorage.setItem(
        'user',
        JSON.stringify(data.user)
      )

      setLoggedIn(true)
      setActivePage('Dashboard')

    } catch (error) {
      console.error(error)
      setLoginError(error.message)
    } finally {
      setLoggingIn(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')

    setLoggedIn(false)
    setEmail('')
    setPassword('')
    setActivePage('Dashboard')
  }

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
    Settings: <Settings />
  }

  // =====================================================
  // LOGIN PAGE
  // =====================================================

  if (!loggedIn) {
    return (
      <div className="login-page">

        <div className="login-card">

          <div className="logo">
            🚁
          </div>

          <h1>
            DroneFleet AI
          </h1>

          <p className="subtitle">
            AI-Assisted Drone Fleet Management Platform
          </p>

          <div className="welcome">
            <h2>
              Welcome Back
            </h2>

            <p>
              Sign in to access your fleet control center
            </p>
          </div>

          <form onSubmit={handleLogin}>

            <label>
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {loginError && (
              <div className="error-message">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loggingIn}
            >
              {loggingIn ? 'Signing In...' : 'Sign In'}
            </button>

          </form>

          <p className="footer-text">
            Secure • Intelligent • Scalable
          </p>

        </div>

      </div>
    )
  }

  // =====================================================
  // DASHBOARD
  // =====================================================

  return (
    <div className="dashboard">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="brand">
          🚁 <span>DroneFleet AI</span>
        </div>

        <nav>

          <button
            className={
              activePage === 'Dashboard'
                ? 'active'
                : ''
            }
            onClick={() =>
              setActivePage('Dashboard')
            }
          >
            📊 Dashboard
          </button>

          <button
            className={
              activePage === 'Drones'
                ? 'active'
                : ''
            }
            onClick={() =>
              setActivePage('Drones')
            }
          >
            🚁 Drones
          </button>

          <button
            className={
              activePage === 'Live Map'
                ? 'active'
                : ''
            }
            onClick={() =>
              setActivePage('Live Map')
            }
          >
            🗺️ Live Map
          </button>

          <button
            className={
              activePage === 'Missions'
                ? 'active'
                : ''
            }
            onClick={() =>
              setActivePage('Missions')
            }
          >
            📋 Missions
          </button>

          <button
            className={
              activePage === 'Battery'
                ? 'active'
                : ''
            }
            onClick={() =>
              setActivePage('Battery')
            }
          >
            🔋 Battery
          </button>

          <button
            className={
              activePage === 'Docking Stations'
                ? 'active'
                : ''
            }
            onClick={() =>
              setActivePage('Docking Stations')
            }
          >
            🏠 Docking Stations
          </button>

          <button
            className={
              activePage === 'AI Predictions'
                ? 'active'
                : ''
            }
            onClick={() =>
              setActivePage('AI Predictions')
            }
          >
            🤖 AI Predictions
          </button>

          <button
            className={
              activePage === 'Alerts'
                ? 'active'
                : ''
            }
            onClick={() =>
              setActivePage('Alerts')
            }
          >
            🔔 Alerts
          </button>

          <button
            className={
              activePage === 'Reports'
                ? 'active'
                : ''
            }
            onClick={() =>
              setActivePage('Reports')
            }
          >
            📈 Reports
          </button>

          <button
            className={
              activePage === 'Settings'
                ? 'active'
                : ''
            }
            onClick={() =>
              setActivePage('Settings')
            }
          >
            ⚙️ Settings
          </button>

        </nav>

        {/* LOGOUT */}

        <button
          className="logout"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>

      </aside>

      {/* MAIN CONTENT */}

      <main className="main-content">

        <header>

          <div>

            <h1>
              {activePage}
            </h1>

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