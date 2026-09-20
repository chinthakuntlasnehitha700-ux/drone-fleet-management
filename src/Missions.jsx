import { useEffect, useState } from "react";

function Missions() {
  const [missions, setMissions] = useState([]);
  const [selectedMission, setSelectedMission] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadMissions = () => {
    setLoading(true);

    fetch("http://127.0.0.1:8000/api/missions")
      .then((response) => response.json())
      .then((data) => {
        setMissions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Backend error:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMissions();
  }, []);

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

  const averageProgress =
    missions.length > 0
      ? Math.round(
          missions.reduce(
            (total, mission) => total + mission.progress,
            0
          ) / missions.length
        )
      : 0;

  return (
    <div className="page">

      {/* HEADER */}
      <div className="top-header">

        <div>
          <h1>Mission Management</h1>

          <p>
            Monitor and manage drone missions from the backend.
          </p>
        </div>

        <button
          className="view-button"
          onClick={loadMissions}
        >
          🔄 Refresh
        </button>

      </div>

      {/* STATISTICS */}
      <div className="cards">

        <div className="card">
          <h3>Total Missions</h3>
          <h2>
            {loading ? "..." : missions.length}
          </h2>
          <p>Backend missions</p>
        </div>

        <div className="card">
          <h3>Active Missions</h3>
          <h2>
            {loading ? "..." : activeMissions}
          </h2>
          <p>Currently running</p>
        </div>

        <div className="card">
          <h3>Completed</h3>
          <h2>
            {loading ? "..." : completedMissions}
          </h2>
          <p>Finished missions</p>
        </div>

        <div className="card">
          <h3>Average Progress</h3>
          <h2>
            {loading ? "..." : `${averageProgress}%`}
          </h2>
          <p>Overall progress</p>
        </div>

      </div>

      {/* MISSION TABLE */}
      <div className="section">

        <div className="section-heading">

          <h2>All Missions</h2>

          <span>
            {missions.length} missions
          </span>

        </div>

        {loading ? (

          <p>Loading mission data...</p>

        ) : (

          <div style={{ overflowX: "auto" }}>

            <table className="drone-table">

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
                      {mission.status}
                    </td>

                    <td>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px"
                        }}
                      >

                        <div
                          className="progress-bar"
                          style={{
                            width: "100px"
                          }}
                        >

                          <div
                            className="progress-fill"
                            style={{
                              width: `${mission.progress}%`
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
                        className="view-button"
                        onClick={() =>
                          setSelectedMission(mission)
                        }
                      >
                        View
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* MISSION SUMMARY */}
      <div className="section">

        <div className="section-heading">
          <h2>Mission Summary</h2>
        </div>

        <div className="status-grid">

          <div className="status-box">
            <span>🟢</span>
            <strong>{activeMissions}</strong>
            <p>Active</p>
          </div>

          <div className="status-box">
            <span>🕒</span>
            <strong>{pendingMissions}</strong>
            <p>Pending</p>
          </div>

          <div className="status-box">
            <span>🔄</span>
            <strong>{returningMissions}</strong>
            <p>Returning</p>
          </div>

          <div className="status-box">
            <span>✅</span>
            <strong>{completedMissions}</strong>
            <p>Completed</p>
          </div>

        </div>

      </div>

      {/* DETAILS POPUP */}
      {selectedMission && (

        <div className="modal-overlay">

          <div className="modal-box">

            <h2>🎯 Mission Details</h2>

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
              className="view-button"
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