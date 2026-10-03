import { useEffect, useState } from 'react'
import { apiFetch } from '../api'

function Settings() {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  const [notifications, setNotifications] = useState(true)
  const [lowBatteryAlerts, setLowBatteryAlerts] = useState(true)
  const [missionAlerts, setMissionAlerts] = useState(true)
  const [aiPredictions, setAiPredictions] = useState(true)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await apiFetch('/api/settings')

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.detail || 'Failed to fetch settings')
      }

      const data = await response.json()

      setSettings(data)

      if (data.notifications !== undefined) {
        setNotifications(data.notifications)
      }

      if (data.low_battery_alerts !== undefined) {
        setLowBatteryAlerts(data.low_battery_alerts)
      }

      if (data.mission_alerts !== undefined) {
        setMissionAlerts(data.mission_alerts)
      }

      if (data.ai_predictions !== undefined) {
        setAiPredictions(data.ai_predictions)
      }

    } catch (error) {
      console.error(error)
      setError(error.message || 'Unable to connect to backend')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = () => {
    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 3000)
  }

  if (loading) {
    return (
      <div className="settings-page">
        <div className="loading-message">
          Loading settings...
        </div>
      </div>
    )
  }

  return (
    <div className="settings-page">

      <div className="module-header">
        <div>
          <h2>Settings</h2>
          <p>
            Manage DroneFleet AI platform preferences.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={loadSettings}
        >
          Refresh Settings
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="settings-section">

        <h3>Notification Settings</h3>

        <div className="settings-grid">

          <div className="settings-card">

            <div className="settings-option">
              <div>
                <h4>Notifications</h4>
                <p>
                  Receive fleet system notifications.
                </p>
              </div>

              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) =>
                  setNotifications(e.target.checked)
                }
              />
            </div>

          </div>

          <div className="settings-card">

            <div className="settings-option">
              <div>
                <h4>Low Battery Alerts</h4>
                <p>
                  Alert when drone battery is low.
                </p>
              </div>

              <input
                type="checkbox"
                checked={lowBatteryAlerts}
                onChange={(e) =>
                  setLowBatteryAlerts(e.target.checked)
                }
              />
            </div>

          </div>

          <div className="settings-card">

            <div className="settings-option">
              <div>
                <h4>Mission Alerts</h4>
                <p>
                  Receive important mission updates.
                </p>
              </div>

              <input
                type="checkbox"
                checked={missionAlerts}
                onChange={(e) =>
                  setMissionAlerts(e.target.checked)
                }
              />
            </div>

          </div>

          <div className="settings-card">

            <div className="settings-option">
              <div>
                <h4>AI Predictions</h4>
                <p>
                  Enable AI-assisted fleet predictions.
                </p>
              </div>

              <input
                type="checkbox"
                checked={aiPredictions}
                onChange={(e) =>
                  setAiPredictions(e.target.checked)
                }
              />
            </div>

          </div>

        </div>

        <div className="settings-actions">

          <button
            className="primary-button"
            onClick={handleSave}
          >
            Save Settings
          </button>

          {saved && (
            <div className="success-message">
              Settings saved successfully.
            </div>
          )}

        </div>

      </div>

      {settings && (
        <div className="report-card">

          <div className="report-card-header">
            <h3>System Information</h3>
          </div>

          <p>
            <strong>Platform:</strong> DroneFleet AI
          </p>

          <p>
            <strong>Backend:</strong> FastAPI
          </p>

          <p>
            <strong>Authentication:</strong> JWT
          </p>

          <p>
            <strong>Database:</strong> SQLite
          </p>

        </div>
      )}

    </div>
  )
}

export default Settings