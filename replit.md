# SmartSOC IR - AI-Powered Security Operations Center

## Project Overview
SmartSOC IR is a comprehensive security operations center dashboard showcasing advanced AI-powered threat detection, real-time analytics, and automated incident response capabilities.

## Architecture
This is a hybrid web application with:
- **Frontend**: Static HTML/CSS/JavaScript files (landing.html, index.html, analytics.html)
- **Backend API**: FastAPI server providing REST endpoints
- **Server**: Unified Flask server that serves static files and proxies API requests

## Tech Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+), Tailwind CSS, Chart.js, Particles.js
- **Backend**: FastAPI, Python 3.11
- **Server**: Flask (development), Uvicorn (FastAPI backend)
- **ML/Data**: scikit-learn, pandas, numpy

## Project Structure
```
SmartSOC IR/
├── index.html              # Main SOC Dashboard
├── landing.html            # Landing Page (default)
├── analytics.html          # Analytics Dashboard
├── assets/                 # Static assets (CSS, JS)
├── backend/                # FastAPI backend
│   ├── server.py          # Main FastAPI app
│   ├── alerts.py          # Alerts API
│   ├── chat.py            # Chat/AI Assistant API
│   ├── remediate.py       # Remediation API
│   └── simulate.py        # Threat Simulation API
├── ui/                    # Streamlit UI (alternative)
├── phishing_module/       # Phishing detection module
├── start_server.py        # Unified server entry point
└── requirements.txt       # Python dependencies
```

## Running the Application

### Development
The application runs automatically via the configured workflow:
```bash
python start_server.py
```

This starts:
- Flask server on port 5000 (serves static files)
- FastAPI backend on port 8000 (API endpoints)

### Accessing the Application
- **Landing Page**: http://localhost:5000/ or /landing.html
- **Main Dashboard**: http://localhost:5000/index.html
- **Analytics**: http://localhost:5000/analytics.html

## API Endpoints
The FastAPI backend provides:
- `GET /api/alerts` - Get all security alerts
- `GET /api/alerts/{id}` - Get specific alert details
- `POST /api/chat` - Chat with AI assistant
- `POST /api/remediate/{id}` - Get remediation suggestions
- `GET /api/simulate/*` - Threat simulation endpoints

## Features
- Real-time threat detection and monitoring
- Interactive AI security assistant
- Advanced analytics and visualization
- Geographic threat mapping
- Automated incident response
- Live event streaming

## Recent Changes
- 2025-10-06: Initial Replit setup
  - Configured Python 3.11 environment
  - Installed all dependencies
  - Created unified server (start_server.py)
  - Configured workflow for automatic startup
  - Set up deployment configuration (VM mode)

## Notes
- Frontend uses CDN resources (Tailwind, Chart.js, Particles.js)
- Some JavaScript warnings exist in browser console (existing in original code)
- Backend API uses mock data for demonstration purposes
- Gemini API key is embedded in chat.py (should be moved to secrets for production)
