from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from jose import jwt, JWTError
from datetime import datetime, timedelta, timezone
import sqlite3
import hashlib
import secrets

# =========================================================
# APP CONFIGURATION
# =========================================================

app = FastAPI(
    title="DroneFleet AI API",
    description="AI-Assisted Drone Fleet Management Platform API",
    version="1.0.0"
)

# =========================================================
# CORS CONFIGURATION
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================================================
# JWT CONFIGURATION
# =========================================================

SECRET_KEY = "dronefleet-ai-secret-key-change-before-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

security = HTTPBearer()

# =========================================================
# DATABASE
# =========================================================

DATABASE = "dronefleet.db"


def get_db():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection


# =========================================================
# PASSWORD HASHING
# =========================================================

def hash_password(password: str, salt: str = None):
    if salt is None:
        salt = secrets.token_hex(16)

    password_hash = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt.encode("utf-8"),
        100000
    ).hex()

    return f"{salt}${password_hash}"


def verify_password(password: str, stored_password: str):
    try:
        salt, stored_hash = stored_password.split("$")

        password_hash = hashlib.pbkdf2_hmac(
            "sha256",
            password.encode("utf-8"),
            salt.encode("utf-8"),
            100000
        ).hex()

        return secrets.compare_digest(
            password_hash,
            stored_hash
        )

    except Exception:
        return False


# =========================================================
# JWT FUNCTIONS
# =========================================================

def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({
        "exp": expire
    })

    return jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        email = payload.get("sub")
        role = payload.get("role")

        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication token"
            )

        return {
            "email": email,
            "role": role
        }

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )


# =========================================================
# CREATE TABLES
# =========================================================

def create_tables():

    connection = get_db()
    cursor = connection.cursor()

    # =====================================================
    # USERS
    # =====================================================

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT NOT NULL
        )
    """)

    # =====================================================
    # DRONES
    # =====================================================

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS drones (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            drone_id TEXT UNIQUE,
            model TEXT,
            location TEXT,
            battery INTEGER,
            status TEXT,
            mission TEXT
        )
    """)

    # =====================================================
    # MISSIONS
    # =====================================================

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS missions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            mission_id TEXT UNIQUE,
            drone_id TEXT,
            mission_type TEXT,
            location TEXT,
            status TEXT
        )
    """)

    # =====================================================
    # DOCKING STATIONS
    # =====================================================

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS docking_stations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            station_id TEXT UNIQUE,
            name TEXT,
            location TEXT,
            status TEXT,
            battery_level INTEGER,
            drone_id TEXT,
            temperature INTEGER
        )
    """)

    # =====================================================
    # ALERTS
    # =====================================================

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS alerts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            alert_id TEXT UNIQUE,
            source TEXT,
            type TEXT,
            message TEXT,
            severity TEXT,
            status TEXT
        )
    """)

    connection.commit()

    # =====================================================
    # CREATE DEMO USER
    # =====================================================

    cursor.execute(
        "SELECT * FROM users WHERE email = ?",
        ("admin@dronefleet.ai",)
    )

    existing_user = cursor.fetchone()

    if existing_user is None:

        password_hash = hash_password("admin123")

        cursor.execute("""
            INSERT INTO users
            (email, password_hash, role)
            VALUES (?, ?, ?)
        """, (
            "admin@dronefleet.ai",
            password_hash,
            "admin"
        ))

    # =====================================================
    # INSERT DRONES
    # =====================================================

    cursor.execute("SELECT COUNT(*) FROM drones")

    drone_count = cursor.fetchone()[0]

    if drone_count == 0:

        drones = [

            (
                "DR-001",
                "DJI Matrice 350",
                "Zone A",
                92,
                "Online",
                "Delivery"
            ),

            (
                "DR-002",
                "DJI Mavic 3",
                "Zone B",
                76,
                "Online",
                "Survey"
            ),

            (
                "DR-003",
                "Autel EVO II",
                "Zone C",
                24,
                "Returning",
                "Inspection"
            ),

            (
                "DR-004",
                "DJI Matrice 300",
                "Zone A",
                88,
                "Online",
                "Inspection"
            ),

            (
                "DR-005",
                "DJI Mavic 3 Enterprise",
                "Zone D",
                61,
                "Charging",
                "None"
            ),

            (
                "DR-006",
                "DJI Matrice 350",
                "Zone B",
                45,
                "Online",
                "Survey"
            )
        ]

        cursor.executemany("""
            INSERT INTO drones
            (
                drone_id,
                model,
                location,
                battery,
                status,
                mission
            )
            VALUES (?, ?, ?, ?, ?, ?)
        """, drones)

    # =====================================================
    # INSERT MISSIONS
    # =====================================================

    cursor.execute("SELECT COUNT(*) FROM missions")

    mission_count = cursor.fetchone()[0]

    if mission_count == 0:

        missions = [

            (
                "MS-001",
                "DR-001",
                "Delivery",
                "Zone A",
                "Active"
            ),

            (
                "MS-002",
                "DR-002",
                "Survey",
                "Zone B",
                "Active"
            ),

            (
                "MS-003",
                "DR-003",
                "Inspection",
                "Zone C",
                "Returning"
            ),

            (
                "MS-004",
                "DR-004",
                "Inspection",
                "Zone A",
                "Completed"
            )
        ]

        cursor.executemany("""
            INSERT INTO missions
            (
                mission_id,
                drone_id,
                mission_type,
                location,
                status
            )
            VALUES (?, ?, ?, ?, ?)
        """, missions)

    # =====================================================
    # INSERT DOCKING STATIONS
    # =====================================================

    cursor.execute(
        "SELECT COUNT(*) FROM docking_stations"
    )

    station_count = cursor.fetchone()[0]

    if station_count == 0:

        stations = [

            (
                "DS-01",
                "Main Campus Dock",
                "Main Campus",
                "Available",
                92,
                None,
                28
            ),

            (
                "DS-02",
                "Zone B Dock",
                "Zone B",
                "Attention",
                65,
                "DR-007",
                34
            ),

            (
                "DS-03",
                "Zone C Dock",
                "Zone C",
                "Charging",
                48,
                "DR-003",
                30
            ),

            (
                "DS-04",
                "Zone A Dock",
                "Zone A",
                "Available",
                87,
                None,
                27
            )
        ]

        cursor.executemany("""
            INSERT INTO docking_stations
            (
                station_id,
                name,
                location,
                status,
                battery_level,
                drone_id,
                temperature
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, stations)

    # =====================================================
    # INSERT ALERTS
    # =====================================================

    cursor.execute(
        "SELECT COUNT(*) FROM alerts"
    )

    alert_count = cursor.fetchone()[0]

    if alert_count == 0:

        alerts = [

            (
                "AL-001",
                "DR-003",
                "Low Battery",
                "Battery level is below safe operating level.",
                "Critical",
                "Active"
            ),

            (
                "AL-002",
                "DR-007",
                "Weak Signal",
                "Drone communication signal is weak.",
                "Warning",
                "Active"
            ),

            (
                "AL-003",
                "DS-02",
                "Maintenance",
                "Docking station requires maintenance.",
                "Warning",
                "Active"
            ),

            (
                "AL-004",
                "DR-005",
                "Charging",
                "Drone is currently charging.",
                "Info",
                "Acknowledged"
            )
        ]

        cursor.executemany("""
            INSERT INTO alerts
            (
                alert_id,
                source,
                type,
                message,
                severity,
                status
            )
            VALUES (?, ?, ?, ?, ?, ?)
        """, alerts)

    connection.commit()
    connection.close()


create_tables()


# =========================================================
# PYDANTIC MODELS
# =========================================================

class LoginRequest(BaseModel):
    email: str
    password: str


# =========================================================
# BASIC API
# =========================================================

@app.get("/")
def root():

    return {
        "message": "DroneFleet AI Backend is running"
    }


@app.get("/api/health")
def health():

    return {
        "status": "healthy"
    }


# =========================================================
# AUTHENTICATION
# =========================================================

@app.post("/api/auth/login")
def login(login_data: LoginRequest):

    connection = get_db()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT *
        FROM users
        WHERE email = ?
    """, (login_data.email,))

    user = cursor.fetchone()

    connection.close()

    if user is None:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    if not verify_password(
        login_data.password,
        user["password_hash"]
    ):

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    token = create_access_token({
        "sub": user["email"],
        "role": user["role"]
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "email": user["email"],
            "role": user["role"]
        }
    }


@app.get("/api/auth/me")
def get_me(
    current_user: dict = Depends(get_current_user)
):

    return {
        "user": current_user
    }


# =========================================================
# DRONES
# =========================================================

@app.get("/api/drones")
def get_drones(
    current_user: dict = Depends(get_current_user)
):

    connection = get_db()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            drone_id AS id,
            model,
            location,
            battery,
            status,
            mission
        FROM drones
    """)

    drones = [
        dict(row)
        for row in cursor.fetchall()
    ]

    connection.close()

    return drones


# =========================================================
# MISSIONS
# =========================================================

@app.get("/api/missions")
def get_missions(
    current_user: dict = Depends(get_current_user)
):

    connection = get_db()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            mission_id AS id,
            drone_id,
            mission_type,
            location,
            status
        FROM missions
    """)

    missions = [
        dict(row)
        for row in cursor.fetchall()
    ]

    connection.close()

    return missions


# =========================================================
# DOCKING STATIONS
# =========================================================

@app.get("/api/docking-stations")
def get_docking_stations(
    current_user: dict = Depends(get_current_user)
):

    connection = get_db()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            station_id AS id,
            name,
            location,
            status,
            battery_level,
            drone_id,
            temperature
        FROM docking_stations
    """)

    stations = [
        dict(row)
        for row in cursor.fetchall()
    ]

    connection.close()

    return stations


# =========================================================
# AI PREDICTIONS
# =========================================================

@app.get("/api/ai-predictions")
def get_ai_predictions(
    current_user: dict = Depends(get_current_user)
):

    connection = get_db()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            drone_id AS id,
            model,
            location,
            battery,
            status
        FROM drones
    """)

    drones = cursor.fetchall()

    connection.close()

    predictions = []

    for drone in drones:

        battery = drone["battery"]
        status_value = drone["status"]

        if battery <= 25:

            risk = "High"
            score = 91
            prediction = "Battery Failure Risk"
            recommendation = (
                "Return drone and recharge immediately."
            )

        elif battery <= 50:

            risk = "Medium"
            score = 72
            prediction = "Low Battery Risk"
            recommendation = (
                "Plan charging before next mission."
            )

        elif status_value == "Returning":

            risk = "Medium"
            score = 68
            prediction = "Return Status"
            recommendation = (
                "Monitor drone until it reaches docking station."
            )

        else:

            risk = "Low"
            score = 15
            prediction = "Normal Operation"
            recommendation = (
                "No immediate action required."
            )

        predictions.append({
            "id": drone["id"],
            "model": drone["model"],
            "location": drone["location"],
            "battery": battery,
            "status": status_value,
            "risk": risk,
            "score": score,
            "prediction": prediction,
            "recommendation": recommendation
        })

    return predictions


# =========================================================
# ALERTS
# =========================================================

@app.get("/api/alerts")
def get_alerts(
    current_user: dict = Depends(get_current_user)
):

    connection = get_db()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            alert_id AS id,
            source,
            type,
            message,
            severity,
            status
        FROM alerts
    """)

    alerts = [
        dict(row)
        for row in cursor.fetchall()
    ]

    connection.close()

    return alerts


@app.put("/api/alerts/{alert_id}")
def acknowledge_alert(
    alert_id: str,
    current_user: dict = Depends(get_current_user)
):

    connection = get_db()
    cursor = connection.cursor()

    cursor.execute("""
        UPDATE alerts
        SET status = 'Acknowledged'
        WHERE alert_id = ?
    """, (alert_id,))

    if cursor.rowcount == 0:

        connection.close()

        raise HTTPException(
            status_code=404,
            detail="Alert not found"
        )

    connection.commit()

    cursor.execute("""
        SELECT
            alert_id AS id,
            source,
            type,
            message,
            severity,
            status
        FROM alerts
        WHERE alert_id = ?
    """, (alert_id,))

    alert = dict(cursor.fetchone())

    connection.close()

    return alert


# =========================================================
# REPORTS
# =========================================================

@app.get("/api/reports")
def get_reports(
    current_user: dict = Depends(get_current_user)
):

    connection = get_db()
    cursor = connection.cursor()

    # Total drones
    cursor.execute("""
        SELECT COUNT(*) FROM drones
    """)
    total_drones = cursor.fetchone()[0]

    # Average battery
    cursor.execute("""
        SELECT AVG(battery) FROM drones
    """)
    average_battery = cursor.fetchone()[0] or 0

    # Online drones
    cursor.execute("""
        SELECT COUNT(*)
        FROM drones
        WHERE status = 'Online'
    """)
    online_drones = cursor.fetchone()[0]

    # Returning drones
    cursor.execute("""
        SELECT COUNT(*)
        FROM drones
        WHERE status = 'Returning'
    """)
    returning_drones = cursor.fetchone()[0]

    # Charging drones
    cursor.execute("""
        SELECT COUNT(*)
        FROM drones
        WHERE status = 'Charging'
    """)
    charging_drones = cursor.fetchone()[0]

    # Total missions
    cursor.execute("""
        SELECT COUNT(*) FROM missions
    """)
    total_missions = cursor.fetchone()[0]

    # Active missions
    cursor.execute("""
        SELECT COUNT(*)
        FROM missions
        WHERE status = 'Active'
    """)
    active_missions = cursor.fetchone()[0]

    # Returning missions
    cursor.execute("""
        SELECT COUNT(*)
        FROM missions
        WHERE status = 'Returning'
    """)
    returning_missions = cursor.fetchone()[0]

    # Completed missions
    cursor.execute("""
        SELECT COUNT(*)
        FROM missions
        WHERE status = 'Completed'
    """)
    completed_missions = cursor.fetchone()[0]

    # Active alerts
    cursor.execute("""
        SELECT COUNT(*)
        FROM alerts
        WHERE status = 'Active'
    """)
    active_alerts = cursor.fetchone()[0]

    # Acknowledged alerts
    cursor.execute("""
        SELECT COUNT(*)
        FROM alerts
        WHERE status = 'Acknowledged'
    """)
    acknowledged_alerts = cursor.fetchone()[0]

    connection.close()

    return {
        "total_drones": total_drones,
        "total_missions": total_missions,
        "active_missions": active_missions,
        "completed_missions": completed_missions,
        "returning_missions": returning_missions,
        "acknowledged_alerts": acknowledged_alerts,
        "active_alerts": active_alerts,
        "average_battery": round(average_battery, 1),
        "online_drones": online_drones,
        "returning_drones": returning_drones,
        "charging_drones": charging_drones
    }


# =========================================================
# SETTINGS
# =========================================================

@app.get("/api/settings")
def get_settings(
    current_user: dict = Depends(get_current_user)
):

    connection = get_db()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT COUNT(*) FROM drones
    """)
    total_drones = cursor.fetchone()[0]

    cursor.execute("""
        SELECT COUNT(*) FROM missions
    """)
    total_missions = cursor.fetchone()[0]

    cursor.execute("""
        SELECT COUNT(*) FROM alerts
    """)
    total_alerts = cursor.fetchone()[0]

    connection.close()

    return {
        "system_name": "DroneFleet AI",
        "backend_status": "Online",
        "database": "SQLite",
        "api_status": "Operational",
        "total_drones": total_drones,
        "total_missions": total_missions,
        "total_alerts": total_alerts,
        "version": "1.0.0"
    }