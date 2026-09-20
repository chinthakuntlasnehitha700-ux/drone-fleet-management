from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="DroneFleet AI Backend",
    description="Backend for AI-Assisted Drone Fleet Management Platform",
    version="1.0.0"
)

# Allow React frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- DRONES ----------------

drones = [
    {
        "id": "DR-001",
        "model": "Falcon X1",
        "status": "Active",
        "battery": 92,
        "location": "Hyderabad",
        "mission": "Delivery A",
        "temperature": 31,
        "signal": "Strong"
    },
    {
        "id": "DR-002",
        "model": "Falcon X1",
        "status": "In Mission",
        "battery": 68,
        "location": "Secunderabad",
        "mission": "Survey B",
        "temperature": 29,
        "signal": "Strong"
    },
    {
        "id": "DR-003",
        "model": "Hawk Pro",
        "status": "Charging",
        "battery": 41,
        "location": "Dock A",
        "mission": "Returning",
        "temperature": 30,
        "signal": "Medium"
    },
    {
        "id": "DR-004",
        "model": "Hawk Pro",
        "status": "Warning",
        "battery": 23,
        "location": "Hyderabad",
        "mission": "Inspection",
        "temperature": 35,
        "signal": "Weak"
    },
    {
        "id": "DR-005",
        "model": "Falcon X2",
        "status": "Available",
        "battery": 87,
        "location": "Dock B",
        "mission": "None",
        "temperature": 28,
        "signal": "Strong"
    }
]

# ---------------- MISSIONS ----------------

missions = [
    {
        "id": "MS-001",
        "drone": "DR-001",
        "task": "Delivery",
        "location": "Zone A",
        "status": "In Progress",
        "progress": 72
    },
    {
        "id": "MS-002",
        "drone": "DR-002",
        "task": "Survey",
        "location": "Zone B",
        "status": "In Progress",
        "progress": 48
    },
    {
        "id": "MS-003",
        "drone": "DR-003",
        "task": "Return",
        "location": "Zone C",
        "status": "Returning",
        "progress": 85
    },
    {
        "id": "MS-004",
        "drone": "DR-004",
        "task": "Inspection",
        "location": "Zone A",
        "status": "Completed",
        "progress": 100
    }
]

# ---------------- ALERTS ----------------

alerts = [
    {
        "id": 1,
        "level": "Critical",
        "icon": "🔴",
        "title": "Low Battery",
        "message": "DR-003 battery level is below 20%.",
        "source": "DR-003",
        "time": "2 minutes ago",
        "status": "Active"
    },
    {
        "id": 2,
        "level": "Warning",
        "icon": "⚠️",
        "title": "Weak Signal",
        "message": "DR-007 connection signal is weak.",
        "source": "DR-007",
        "time": "8 minutes ago",
        "status": "Active"
    },
    {
        "id": 3,
        "level": "Warning",
        "icon": "🔋",
        "title": "Docking Station Alert",
        "message": "Docking Station DS-02 requires attention.",
        "source": "DS-02",
        "time": "15 minutes ago",
        "status": "Active"
    },
    {
        "id": 4,
        "level": "Info",
        "icon": "ℹ️",
        "title": "Mission Completed",
        "message": "DR-004 completed its inspection mission.",
        "source": "DR-004",
        "time": "32 minutes ago",
        "status": "Active"
    },
    {
        "id": 5,
        "level": "Warning",
        "icon": "🌡️",
        "title": "High Temperature",
        "message": "DR-005 temperature is above the normal range.",
        "source": "DR-005",
        "time": "45 minutes ago",
        "status": "Active"
    }
]

# ---------------- HOME ----------------

@app.get("/")
def home():
    return {
        "message": "DroneFleet AI Backend is running"
    }

# ---------------- HEALTH ----------------

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy"
    }

# ---------------- DRONE APIs ----------------

@app.get("/api/drones")
def get_drones():
    return drones


@app.get("/api/drones/{drone_id}")
def get_drone(drone_id: str):

    for drone in drones:
        if drone["id"] == drone_id:
            return drone

    return {
        "error": "Drone not found"
    }

# ---------------- MISSION APIs ----------------

@app.get("/api/missions")
def get_missions():
    return missions


@app.get("/api/missions/{mission_id}")
def get_mission(mission_id: str):

    for mission in missions:
        if mission["id"] == mission_id:
            return mission

    return {
        "error": "Mission not found"
    }

# ---------------- ALERT APIs ----------------

@app.get("/api/alerts")
def get_alerts():
    return alerts


@app.get("/api/alerts/{alert_id}")
def get_alert(alert_id: int):

    for alert_item in alerts:
        if alert_item["id"] == alert_id:
            return alert_item

    return {
        "error": "Alert not found"
    }

# ---------------- LOGIN ----------------

@app.post("/api/login")
def login():
    return {
        "success": True,
        "message": "Login successful"
    }