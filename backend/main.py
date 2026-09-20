from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="DroneFleet AI Backend",
    description="Backend for AI-Assisted Drone Fleet Management Platform",
    version="1.0.0"
)

# Allow frontend to connect to backend
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

# Sample drone data
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


# Home
@app.get("/")
def home():
    return {
        "message": "DroneFleet AI Backend is running"
    }


# Health check
@app.get("/api/health")
def health_check():
    return {
        "status": "healthy"
    }


# Get all drones
@app.get("/api/drones")
def get_drones():
    return drones


# Get one drone
@app.get("/api/drones/{drone_id}")
def get_drone(drone_id: str):
    for drone in drones:
        if drone["id"] == drone_id:
            return drone

    return {
        "error": "Drone not found"
    }


# Simple login
@app.post("/api/login")
def login():
    return {
        "success": True,
        "message": "Login successful"
    }