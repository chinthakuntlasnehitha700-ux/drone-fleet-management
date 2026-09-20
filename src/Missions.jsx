import React, { useState } from "react";

function Missions() {
  const [missions, setMissions] = useState([
    {
      id: "MS-001",
      drone: "DR-001",
      task: "Delivery",
      location: "Zone A",
      status: "In Progress",
      progress: 72,
    },
    {
      id: "MS-002",
      drone: "DR-002",
      task: "Survey",
      location: "Zone B",
      status: "In Progress",
      progress: 48,
    },
    {
      id: "MS-003",
      drone: "DR-003",
      task: "Return",
      location: "Zone C",
      status: "Returning",
      progress: 85,
    },
    {
      id: "MS-004",
      drone: "DR-004",
      task: "Inspection",
      location: "Zone A",
      status: "Completed",
      progress: 100,
    },
  ]);

  const [selectedMission, setSelectedMission] = useState(null);

  const cancelMission = (id) => {
    setMissions(
      missions.map((mission) =>
        mission.id === id
          ? {
              ...mission,
              status: "Cancelled",
              progress: 0,
            }
          : mission
      )
    );
  };

  const activeMissions = missions.filter(
    (mission) => mission.status === "In Progress"
  ).length;

  const pendingMissions = missions.filter(
    (mission) => mission.status === "Pending"
  ).length;

  const completedMissions = missions.filter(
    (mission) => mission.status === "Completed"
  ).length;

  const returningMissions = missions.filter(
    (mission) => mission.status === "Returning"
  ).length;

  return (
    <div className="page">

      {/* HEADER */}
      <div className="page-header">

        <div>
          <h1>Mission Management</h1>
          <p>
            Manage and monitor all drone missions.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() =>
            alert("Mission data refreshed successfully!")
          }
        >
          🔄 Refresh
        </button>

      </div>

      {/* STATISTICS */}
      <div className="mission-stats">

        <div className="stat-card">
          <span>🎯</span>
          <div>
            <small>Total Missions</small>
            <h2>{missions.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span>🟢</span>
          <div>
            <small>Active Missions</small>
            <h2>{activeMissions}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span>🕒</span>
          <div>
            <small>Pending</small>
            <h2>{pendingMissions}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span>✅</span>
          <div>
            <small>Completed</small>
            <h2>{completedMissions}</h2>
          </div>
        </div>

      </div>

      {/* MISSION LIST */}
      <div className="missions-container">

        <div className="section-title">

          <div>
            <h2>All Missions</h2>
            <p>
              Current mission status and progress
            </p>
          </div>

          <span>
            {missions.length} missions
          </span>

        </div>

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>Mission ID</th>
                <th>Drone</th>
                <th>Task</th>
                <th>Location</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {missions.map((mission) => (

                <tr key={mission.id}>

                  <td>
                    <strong>{mission.id}</strong>
                  </td>

                  <td>
                    🚁 {mission.drone}
                  </td>

                  <td>
                    {mission.task}
                  </td>

                  <td>
                    📍 {mission.location}
                  </td>

                  <td>

                    <span className="status-badge">
                      {mission.status}
                    </span>

                  </td>

                  <td>

                    <div className="battery-cell">

                      <div className="progress-bar">

                        <div
                          className="progress-fill"
                          style={{
                            width: `${mission.progress}%`,
                          }}
                        ></div>

                      </div>

                      <span>
                        {mission.progress}%
                      </span>

                    </div>

                  </td>

                  <td>

                    <button
                      className="view-btn"
                      onClick={() =>
                        setSelectedMission(mission)
                      }
                    >
                      View
                    </button>

                    {mission.status !== "Completed" &&
                      mission.status !== "Cancelled" && (
                        <button
                          className="cancel-btn"
                          onClick={() =>
                            cancelMission(mission.id)
                          }
                        >
                          Cancel
                        </button>
                      )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* MISSION SUMMARY */}
      <div className="missions-container">

        <div className="section-title">

          <div>
            <h2>Mission Overview</h2>
            <p>
              Quick summary of current mission activity
            </p>
          </div>

        </div>

        <div className="mission-stats">

          <div className="stat-card">
            <span>🔄</span>
            <div>
              <small>Returning</small>
              <h2>{returningMissions}</h2>
            </div>
          </div>

          <div className="stat-card">
            <span>📊</span>
            <div>
              <small>Average Progress</small>
              <h2>
                {Math.round(
                  missions.reduce(
                    (total, mission) =>
                      total + mission.progress,
                    0
                  ) / missions.length
                )}
                %
              </h2>
            </div>
          </div>

        </div>

      </div>

      {/* DETAILS POPUP */}
      {selectedMission && (

        <div className="modal-overlay">

          <div className="modal-box">

            <h2>Mission Details</h2>

            <p>
              <strong>Mission ID:</strong>{" "}
              {selectedMission.id}
            </p>

            <p>
              <strong>Drone:</strong>{" "}
              {selectedMission.drone}
            </p>

            <p>
              <strong>Task:</strong>{" "}
              {selectedMission.task}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {selectedMission.location}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {selectedMission.status}
            </p>

            <p>
              <strong>Progress:</strong>{" "}
              {selectedMission.progress}%
            </p>

            <button
              className="primary-btn"
              onClick={() =>
                setSelectedMission(null)
              }
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default Missions;