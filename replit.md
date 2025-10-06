# PhishGuard AI - Real-Time Phishing Detection System

## Project Overview
PhishGuard AI is a **frontend-only simulation** of a production-grade AI-powered phishing detection and prevention system. This hackathon-ready demo showcases advanced threat detection, real-time analytics, and AI-powered analysis without requiring any backend infrastructure.

## ⚡ Hackathon Demo Version
This version runs entirely on the frontend using React, Vite, TailwindCSS, and Recharts:
- ✅ No backend required - fully client-side
- ✅ All data, alerts, graphs, and AI outputs are simulated
- ✅ Looks fully functional and enterprise-ready
- ✅ Lightweight and safe for live demos
- ✅ Runs directly in Replit web view

## Architecture
**Frontend-Only React Application:**
- **Framework**: React 18 + Vite
- **Styling**: TailwindCSS with custom dark mode theme
- **Animations**: Framer Motion
- **Charts**: Recharts (Line & Pie charts)
- **Icons**: Lucide React
- **UI Components**: Radix UI primitives

## Project Structure
```
PhishGuard AI/
├── frontend/                   # Main React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx          # Live stats dashboard
│   │   │   ├── AlertsTable.jsx        # Real-time alerts feed
│   │   │   ├── Analyzer.jsx           # AI text analyzer
│   │   │   ├── ThreatGraph.jsx        # Domain network graph
│   │   │   ├── TrendCharts.jsx        # Activity charts
│   │   │   ├── ExplainPanel.jsx       # AI explanations modal
│   │   │   └── SystemStatus.jsx       # System health panel
│   │   ├── data/
│   │   │   └── sample_alerts.json     # Initial seed data
│   │   ├── utils/
│   │   │   └── fakeData.js            # Data generators
│   │   ├── App.jsx                     # Main app container
│   │   ├── main.jsx                    # Entry point
│   │   └── index.css                   # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── backend/                    # (Legacy - not used)
├── phishing_module/            # (Legacy - not used)
└── replit.md
```

## Running the Application

### On Any Machine (Local Setup)
1. **Clone or download the project**
2. **Navigate to frontend folder**:
   ```bash
   cd frontend
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```
   Or simply:
   ```bash
   npm start
   ```
5. **Open in browser**: http://localhost:5000

### On Replit
The application runs automatically when you press the "Run" button. The Vite dev server is configured to work seamlessly in Replit's environment.

### Build for Production
To create a production build:
```bash
cd frontend
npm run build
```
The optimized files will be in `frontend/dist/` and can be deployed to any static hosting service (Vercel, Netlify, GitHub Pages, etc.)

## Core Features

### 1. Live Dashboard
- Active Phishing Alerts counter
- Links Scanned (auto-incrementing)
- Detection Accuracy display (97.8%)
- Zero-Day Detections counter
- Animated stat cards with progress bars

### 2. Real-Time Alerts Feed
- Auto-generates new phishing alerts every 4 seconds
- Color-coded threat levels (High/Medium/Low)
- AI confidence percentage bars
- Realistic domain patterns (typosquatting simulation)
- Detection type indicators
- Interactive details view

### 3. AI Email/SMS Analyzer
- Text input for email/SMS content
- Simulated AI analysis with 2-second processing animation
- Detailed threat report with:
  - Confidence percentage
  - Detection reasons
  - Recommended actions
- Randomized but realistic responses

### 4. Threat Network Map
- SVG-based domain graph visualization
- Animated node connections
- Color-coded threat levels
- Auto-refreshes every 8 seconds
- Shows relationships between malicious domains

### 5. Trend Analytics
- Phishing activity line chart (time series)
- Threat source distribution pie chart
- Categories: Email, SMS, Web, AI-Generated

### 6. Explainable AI Panel
- Modal dialog for detailed threat analysis
- AI-generated explanations
- Threat indicators list
- Security recommendations
- Smooth animations and transitions

### 7. System Status Monitor
- Live CPU load simulation
- Model uptime display (99.98%)
- API latency monitoring
- Threats blocked counter
- AI model version info

## Tech Implementation Details

### Simulation Logic
- **Auto-updating alerts**: Uses `setInterval()` to push new fake alerts every 4 seconds
- **Random data generation**: Utility functions create realistic domains, threat levels, and confidence scores
- **State management**: React hooks for all dynamic data
- **No backend calls**: All data generated client-side

### UI/UX Features
- Dark mode theme with neon green/blue accents
- Framer Motion animations for smooth transitions
- Responsive grid layout
- Glowing effects and animated indicators
- Professional enterprise-grade design
- Background grid pattern
- Hover effects and interactive elements

### Data Generators
Located in `/frontend/src/utils/fakeData.js`:
- `fakeDomain()` - Generates phishing domains with typosquatting
- `fakeLevel()` - Random threat levels with realistic distribution
- `generateAlert()` - Creates complete alert objects
- `generateExplanation()` - AI explanation templates
- `generateSystemStats()` - System health metrics
- `generateGraphData()` - Network graph data

## Recent Changes
- **2025-10-06: Frontend-Only Transformation**
  - Migrated from hybrid Flask/FastAPI backend to pure React frontend
  - Implemented React + Vite with TailwindCSS
  - Created all simulation components from scratch
  - Added Framer Motion animations
  - Integrated Recharts for data visualization
  - Configured workflow for automatic Vite dev server startup
  - Removed backend dependencies

## Development Notes
- All alerts and data are simulated using mock generators
- No external API calls or backend services
- Console log shows: `[PhishGuard AI] Model v3.2 loaded | Live threat monitoring initialized | Confidence threshold: 0.97`
- Perfect for hackathon presentations and demos
- Can be easily deployed to static hosting (Vercel, Netlify, etc.)

## User Preferences
- Clean, modern dark mode UI
- Professional enterprise aesthetics
- Real-time visual updates
- Interactive components
- No backend complexity
