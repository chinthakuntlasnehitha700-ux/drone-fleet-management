# 🚁 DroneFleet AI

## AI-Assisted Drone Fleet Management Platform

DroneFleet AI is a full-stack web application designed to monitor and manage a fleet of drones using a centralized management platform.

The platform provides drone monitoring, mission management, battery monitoring, docking station management, AI-assisted risk predictions, alerts, reports, authentication, REST APIs, and database integration.

---

## 🎯 Project Objective

The main objective of DroneFleet AI is to provide a centralized platform for managing drone fleet operations and assisting operators with intelligent monitoring and predictions.

The system is designed using modern software engineering practices including:

* Full-stack development
* REST API architecture
* JWT authentication
* Database management
* AI-assisted predictions
* API testing
* Security testing
* Git and GitHub version control
* Modular application architecture

---

## ✨ Features

### 🔐 Authentication

* Secure login system
* JWT-based authentication
* Protected API endpoints
* User role support
* Token validation

### 🚁 Drone Management

* View all drones
* Drone ID and model
* Current location
* Battery percentage
* Drone status
* Current mission

### 🗺️ Live Map

* Fleet location monitoring
* Drone selection
* Drone information display
* Fleet refresh functionality

### 📋 Mission Management

* View missions
* Mission status
* Drone assignment
* Mission type
* Mission location
* Mission filtering

### 🔋 Battery Monitoring

* Battery percentage
* Low battery identification
* Medium battery identification
* Healthy battery identification
* Average fleet battery

### 🏠 Docking Stations

* Docking station monitoring
* Station status
* Battery level
* Temperature
* Assigned drone information

### 🤖 AI Predictions

* Drone risk analysis
* Battery failure risk detection
* Low battery risk detection
* Return-status prediction
* Recommendations for operators

### 🔔 Alerts

* Critical alerts
* Warning alerts
* Informational alerts
* Alert acknowledgement
* Alert status tracking

### 📈 Reports

* Fleet statistics
* Mission statistics
* Alert statistics
* Battery statistics
* Drone status statistics

### ⚙️ Settings

* System information
* Backend status
* Database information
* API status
* Application version

---

## 🛠️ Technology Stack

### Frontend

* React.js
* Vite
* JavaScript
* HTML
* CSS
* Bootstrap
* Chart.js

### Backend

* Python
* FastAPI
* Uvicorn
* Pydantic
* JWT
* Python-Jose

### Database

* SQLite

### Development Tools

* Visual Studio Code
* Git
* GitHub
* Chrome
* Swagger / OpenAPI

---

## 🏗️ Project Architecture

```text
DroneFleet AI
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Drones.jsx
│   │   │   ├── LiveMap.jsx
│   │   │   ├── Missions.jsx
│   │   │   ├── Battery.jsx
│   │   │   ├── DockingStations.jsx
│   │   │   ├── AIPredictions.jsx
│   │   │   ├── Alerts.jsx
│   │   │   ├── Reports.jsx
│   │   │   └── Settings.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── api.js
│   │
│   └── package.json
│
├── backend
│   ├── main.py
│   ├── dronefleet.db
│   └── requirements.txt
│
├── .gitignore
└── README.md
```

---

## 🔌 REST API

### Authentication

```text
POST /api/auth/login
GET  /api/auth/me
```

### Drone APIs

```text
GET /api/drones
```

### Mission APIs

```text
GET /api/missions
```

### Docking Station APIs

```text
GET /api/docking-stations
```

### AI APIs

```text
GET /api/ai-predictions
```

### Alert APIs

```text
GET /api/alerts
PUT /api/alerts/{alert_id}
```

### Reports

```text
GET /api/reports
```

### Settings

```text
GET /api/settings
```

### Health

```text
GET /api/health
```

---

## 🔐 Security

The application implements:

* JWT authentication
* Protected API endpoints
* Password hashing using PBKDF2-HMAC SHA-256
* Token expiration
* Invalid token detection
* Unauthorized request handling
* CORS configuration
* Parameterized SQL queries

---

## 🧠 AI-Assisted Prediction

The AI prediction module analyzes drone conditions such as:

* Battery level
* Drone status
* Operational condition

Based on these values, the system identifies:

* High risk
* Medium risk
* Low risk

The system also provides recommendations to help operators take appropriate action.

---

## 🗄️ Database

The application uses SQLite for data storage.

Main tables:

```text
users
drones
missions
docking_stations
alerts
```

---

## ▶️ Running the Project

### Frontend

Open terminal inside the frontend folder:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

### Backend

Open another terminal:

```bash
cd backend
python -m uvicorn main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

Swagger API documentation:

```text
http://127.0.0.1:8000/docs
```

---

## 🔑 Demo Login

```text
Email: admin@dronefleet.ai
Password: admin123
```

> Demo credentials are provided for local development and testing only.

---

## 🧪 Testing

The application has been tested for:

* Login authentication
* JWT token validation
* Protected API access
* Invalid token handling
* Missing token handling
* Drone API
* Mission API
* Docking station API
* AI prediction API
* Alert API
* Reports API
* Settings API
* Frontend-backend integration

---

## 📌 Project Status

Current implementation includes:

* ✅ React frontend
* ✅ FastAPI backend
* ✅ SQLite database
* ✅ JWT authentication
* ✅ REST APIs
* ✅ Drone management
* ✅ Mission management
* ✅ Battery monitoring
* ✅ Docking station monitoring
* ✅ AI predictions
* ✅ Alerts
* ✅ Reports
* ✅ Settings
* ✅ API documentation
* ✅ Security testing
* ✅ GitHub version control

---

## 🚀 Future Enhancements

Future versions can include:

* Real-time drone GPS tracking
* Real drone telemetry integration
* Advanced machine learning models
* Predictive maintenance
* Role-based access control
* PostgreSQL production database
* Docker deployment
* Cloud deployment
* Automated CI/CD
* Advanced analytics
* Real-time notifications

---

## 👩‍💻 Project

**DroneFleet AI — AI-Assisted Drone Fleet Management Platform**

Developed as a B.Tech CSE Data Science project using modern full-stack development and AI-assisted software engineering practices.
