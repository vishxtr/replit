# 🛡️ PhishGuard AI - Real-Time Phishing Detection System

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.3-61dafb.svg)
![Vite](https://img.shields.io/badge/Vite-6.0-646cff.svg)

A **frontend-only simulation** of an enterprise-grade AI-powered phishing detection and prevention system. This project showcases advanced threat detection, real-time analytics, and AI-powered analysis without requiring any backend infrastructure.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Components](#components)
- [Simulation Logic](#simulation-logic)
- [Deployment](#deployment)
- [Development](#development)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## 🎯 Overview

PhishGuard AI is a demonstration of a modern Security Operations Center (SOC) dashboard that simulates real-time phishing threat detection. Built entirely on the frontend using React and Vite, it provides a realistic, interactive experience of an AI-powered security system without the complexity of backend infrastructure.

### Why Frontend-Only?

- ✅ **Zero Backend Complexity** - No servers, databases, or APIs to manage
- ✅ **Instant Setup** - Run anywhere with just Node.js installed
- ✅ **Perfect for Demos** - Ideal for presentations, hackathons, and portfolios
- ✅ **Production-Ready UI** - Professional design that looks like a real enterprise system
- ✅ **Fully Interactive** - All features work with simulated data

## ✨ Features

### 1. 📊 Live Dashboard
- **Real-time Statistics Cards**
  - Active Phishing Alerts counter
  - Links Scanned (auto-incrementing)
  - Detection Accuracy (97.8%)
  - Zero-Day Detections
- **Animated Progress Bars** - Visual indicators with smooth transitions
- **Color-coded Indicators** - Red, green, yellow for different threat levels

### 2. 🚨 Real-Time Alerts Feed
- **Auto-generating Alerts** - New phishing alerts every 4 seconds
- **Threat Level Classification** - High, Medium, Low with color-coded badges
- **AI Confidence Scores** - Percentage bars showing detection confidence
- **Realistic Domains** - Typosquatting simulation (paypal1-secure.com, microsoft-verify.net)
- **Detection Types** - URL Analysis, Email Content, SMS Pattern, Domain Reputation
- **Interactive Details** - Click to view comprehensive threat analysis

### 3. 🤖 AI Email/SMS Analyzer
- **Text Input Analysis** - Paste any email or SMS content
- **Simulated Processing** - 2-second AI analysis animation
- **Detailed Threat Report**
  - Confidence percentage
  - Specific detection reasons
  - Recommended actions
- **Randomized Responses** - Realistic but varied outputs

### 4. 🕸️ Threat Network Map
- **SVG-based Visualization** - Domain relationship graph
- **Animated Connections** - Flowing lines between nodes
- **Color-coded Nodes** - Red (High), Yellow (Medium), Green (Low)
- **Auto-refresh** - Updates every 8 seconds
- **Interactive Design** - Shows malicious infrastructure connections

### 5. 📈 Trend Analytics
- **Time Series Chart** - Phishing activity over 24 hours (Recharts)
- **Distribution Pie Chart** - Threat sources (Email 45%, SMS 25%, Web 20%, AI-Generated 10%)
- **Smooth Animations** - Responsive chart interactions
- **Real-time Updates** - Data refreshes periodically

### 6. 🧠 Explainable AI Panel
- **Modal Dialog Interface** - Detailed threat analysis overlay
- **AI-generated Explanations** - Natural language threat descriptions
- **Threat Indicators List** - Specific red flags detected
- **Security Recommendations** - Step-by-step action items
- **Smooth Transitions** - Framer Motion animations

### 7. 🖥️ System Status Monitor
- **Live Metrics**
  - CPU Load simulation (20-50%)
  - Model Uptime (99.98%)
  - API Latency (15-35ms)
  - Threats Blocked (24h counter)
- **AI Model Version** - v3.2.1
- **Animated Progress Bar** - System health indicator

## 🛠️ Tech Stack

### Core Technologies
- **React 18.3** - Modern UI library with hooks
- **Vite 6.0** - Lightning-fast build tool and dev server
- **TailwindCSS 3.4** - Utility-first CSS framework
- **JavaScript (ES6+)** - Modern JavaScript features

### UI & Animations
- **Framer Motion 11.x** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library
- **Radix UI** - Accessible component primitives

### Data Visualization
- **Recharts 2.15** - React chart library
  - Line charts for trends
  - Pie charts for distribution
  - Responsive containers

### Development Tools
- **PostCSS** - CSS transformation
- **Autoprefixer** - CSS vendor prefixing
- **ESLint** (optional) - Code linting

## 🚀 Quick Start

### Using Python Setup Script (Recommended)

```bash
# Run the automated setup script
python run.py
```

This will:
1. Check for Node.js and npm
2. Install all dependencies
3. Start the development server
4. Open http://localhost:5000

### Manual Setup

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# Visit http://localhost:5000
```

## 📦 Installation

### Prerequisites

- **Node.js** 18.0 or higher ([Download](https://nodejs.org/))
- **npm** 9.0 or higher (comes with Node.js)
- **Git** (optional, for cloning)

### Step-by-Step Installation

1. **Clone or Download the Project**
   ```bash
   git clone <repository-url>
   cd PhishGuard-AI
   ```

2. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Access the Application**
   - Open browser to `http://localhost:5000`
   - The dashboard should load immediately

### Verify Installation

After starting, you should see:
- Console message: `[PhishGuard AI] Model v3.2 loaded | Live threat monitoring initialized`
- Dashboard with live stats
- Auto-generating alerts every 4 seconds

## 📁 Project Structure

```
PhishGuard-AI/
├── frontend/                      # Main React application
│   ├── src/
│   │   ├── components/            # React components
│   │   │   ├── Dashboard.jsx      # Stats dashboard with cards
│   │   │   ├── AlertsTable.jsx    # Live alerts feed table
│   │   │   ├── Analyzer.jsx       # AI text analysis component
│   │   │   ├── ThreatGraph.jsx    # Network visualization
│   │   │   ├── TrendCharts.jsx    # Analytics charts
│   │   │   ├── ExplainPanel.jsx   # AI explanation modal
│   │   │   └── SystemStatus.jsx   # System health panel
│   │   ├── data/
│   │   │   └── sample_alerts.json # Initial seed data
│   │   ├── utils/
│   │   │   └── fakeData.js        # Mock data generators
│   │   ├── App.jsx                # Main app component
│   │   ├── main.jsx               # Entry point
│   │   └── index.css              # Global styles + Tailwind
│   ├── public/                    # Static assets
│   ├── index.html                 # HTML template
│   ├── package.json               # Dependencies
│   ├── vite.config.js             # Vite configuration
│   ├── tailwind.config.js         # Tailwind configuration
│   ├── postcss.config.js          # PostCSS configuration
│   └── .gitignore                 # Git ignore rules
├── old_files/                     # Legacy code (archived)
├── run.py                         # Auto-setup script
├── README.md                      # This file
├── replit.md                      # Replit-specific docs
└── .gitignore                     # Root gitignore
```

## 🏗️ Architecture

### Component Hierarchy

```
App
├── Header (Logo, Status Indicator)
├── Dashboard (Stats Cards)
│   └── StatCard × 4
├── AlertsTable (Live Feed)
│   └── AlertRow × N
├── Analyzer (AI Text Input)
│   └── AnalysisResult
├── TrendCharts
│   ├── LineChart (Activity)
│   └── PieChart (Distribution)
├── SystemStatus (Metrics Panel)
└── ThreatGraph (Network Map)

Modal Overlays:
└── ExplainPanel (Threat Details)
```

### Data Flow

```
User Interaction
      ↓
State Update (React Hooks)
      ↓
Component Re-render
      ↓
Animation Trigger (Framer Motion)
      ↓
Visual Update
```

### Simulation System

```
setInterval Timers
      ↓
Data Generators (fakeData.js)
      ↓
State Updates (useState)
      ↓
UI Refresh (React)
```

## 🧩 Components

### Dashboard.jsx
**Purpose**: Display key metrics and statistics

**Features**:
- 4 animated stat cards
- Auto-incrementing counters
- Progress bar animations
- Color-coded indicators

**State**:
- `activeAlerts` - Count of active threats
- `linksScanned` - Total scanned (increments)

### AlertsTable.jsx
**Purpose**: Show live phishing alerts feed

**Features**:
- Auto-scrolling table
- Color-coded threat badges
- Confidence progress bars
- Click to view details

**Props**:
- `alerts` - Array of alert objects
- `onViewDetails` - Callback for details

### Analyzer.jsx
**Purpose**: AI-powered text analysis

**Features**:
- Text input area
- Loading animation
- Result display with reasons
- Action recommendations

**State**:
- `text` - Input content
- `analyzing` - Loading state
- `result` - Analysis output

### ThreatGraph.jsx
**Purpose**: Visualize domain relationships

**Features**:
- SVG-based rendering
- Animated nodes and connections
- Color-coded by threat level
- Auto-refresh every 8s

**Props**:
- `graphData` - Nodes and links

### TrendCharts.jsx
**Purpose**: Display analytics charts

**Features**:
- Line chart (time series)
- Pie chart (distribution)
- Responsive design
- Tooltip interactions

**Props**:
- `trendData` - Time series array
- `distributionData` - Pie chart data

### ExplainPanel.jsx
**Purpose**: Detailed threat explanation

**Features**:
- Modal overlay
- AI-generated text
- Indicator list
- Recommendations

**Props**:
- `alert` - Selected alert object
- `onClose` - Close callback

### SystemStatus.jsx
**Purpose**: Show system health

**Features**:
- Live metrics
- Animated values
- Progress indicator
- Model version info

## 🎲 Simulation Logic

### Data Generators (fakeData.js)

#### `fakeDomain()`
Generates realistic phishing domains with typosquatting:
```javascript
// Examples:
// paypal1-secure.com
// microsoft-verify.net
// amazon-login.com
```

#### `fakeLevel()`
Returns weighted threat levels:
- Low: 30%
- Medium: 40%
- High: 30%

#### `generateAlert()`
Creates complete alert objects:
```javascript
{
  id: string,
  timestamp: ISO string,
  domain: string,
  sender: string,
  threatLevel: "High"|"Medium"|"Low",
  detectionType: string,
  confidence: "85-99%",
  status: "Active",
  description: string
}
```

#### `generateExplanation(alert)`
Creates AI explanation based on alert:
```javascript
{
  confidence: number,
  type: string,
  explanation: string,
  recommendations: string[],
  indicators: string[]
}
```

### Timers & Intervals

| Interval | Duration | Purpose |
|----------|----------|---------|
| Alert Generation | 4s | New phishing alerts |
| Graph Update | 8s | Network map refresh |
| Stats Increment | 3s | Links scanned counter |
| System Stats | 3s | CPU/latency updates |

## 🌐 Deployment

### Static Hosting (Recommended)

#### Build for Production
```bash
cd frontend
npm run build
```

Output: `frontend/dist/` (optimized static files)

#### Deploy to Vercel
```bash
npm install -g vercel
cd frontend
vercel --prod
```

#### Deploy to Netlify
```bash
cd frontend
npm run build
# Drag & drop 'dist' folder to Netlify
```

#### Deploy to GitHub Pages
```bash
# Set base path in vite.config.js
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})

npm run build
# Push dist/ to gh-pages branch
```

### Environment Configuration

No environment variables needed! Everything runs client-side.

## 💻 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (port 5000) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm start` | Alias for `npm run dev` |

### Development Server

```bash
npm run dev

# Server runs at:
# - Local:   http://localhost:5000
# - Network: http://[your-ip]:5000
```

### Hot Module Replacement (HMR)

Changes to `.jsx`, `.js`, `.css` files automatically reload in browser.

### Adding New Features

1. **Create Component**
   ```javascript
   // src/components/MyComponent.jsx
   export default function MyComponent() {
     return <div>...</div>
   }
   ```

2. **Import in App.jsx**
   ```javascript
   import MyComponent from './components/MyComponent'
   ```

3. **Add Styling** (Tailwind classes)
   ```jsx
   <div className="card bg-dark-card">...</div>
   ```

### Customization

#### Change Theme Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      'neon-green': '#00ff88',  // Change this
      'neon-blue': '#00d4ff',   // And this
    }
  }
}
```

#### Adjust Simulation Speed
Edit timers in `App.jsx`:
```javascript
// Alert generation (default: 4000ms)
setInterval(() => {
  const newAlert = generateAlert();
  // ...
}, 4000); // Change this value
```

## 🐛 Troubleshooting

### Port Already in Use

**Problem**: `Error: Port 5000 is already in use`

**Solution**:
```bash
# Option 1: Kill the process
# On Mac/Linux:
lsof -ti:5000 | xargs kill -9

# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Option 2: Use different port
npm run dev -- --port 3000
```

### Dependencies Not Installing

**Problem**: `npm install` fails

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Blank Screen

**Problem**: Application shows blank page

**Solution**:
1. Check browser console for errors
2. Verify Node.js version (18+)
3. Clear browser cache (Ctrl+Shift+R)
4. Rebuild:
   ```bash
   npm run build
   npm run preview
   ```

### Styles Not Loading

**Problem**: UI looks unstyled

**Solution**:
```bash
# Rebuild Tailwind
npx tailwindcss -i ./src/index.css -o ./dist/output.css

# Or restart dev server
npm run dev
```

### Module Not Found Errors

**Problem**: `Cannot find module 'xyz'`

**Solution**:
```bash
# Reinstall specific package
npm install xyz

# Or reinstall all
npm install
```

## 📝 License

MIT License - feel free to use for personal or commercial projects.

## 🤝 Contributing

This is a demonstration project, but suggestions are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Support

For issues or questions:
- Check [Troubleshooting](#troubleshooting) section
- Review console logs in browser DevTools
- Ensure Node.js 18+ is installed

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Framer Motion API](https://www.framer.com/motion/)
- [Recharts Examples](https://recharts.org/en-US/examples)

## 🌟 Features Roadmap

Future enhancements (simulated):
- [ ] Dark/Light theme toggle
- [ ] Export alerts to CSV/PDF
- [ ] More chart types
- [ ] Custom alert filters
- [ ] Mobile responsive design improvements
- [ ] Keyboard shortcuts
- [ ] Alert sound notifications

---

**Built with ❤️ using React, Vite, and TailwindCSS**

*Perfect for demonstrations, portfolios, and learning modern web development!*
