import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Menu, X } from 'lucide-react';
import Dashboard from './components/Dashboard';
import AlertsTable from './components/AlertsTable';
import Analyzer from './components/Analyzer';
import ThreatGraph from './components/ThreatGraph';
import TrendCharts from './components/TrendCharts';
import ExplainPanel from './components/ExplainPanel';
import SystemStatus from './components/SystemStatus';
import { generateAlert, generateGraphData } from './utils/fakeData';
import sampleAlerts from './data/sample_alerts.json';

function App() {
  const [alerts, setAlerts] = useState(sampleAlerts);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [graphData, setGraphData] = useState(generateGraphData());
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Simulate real-time alert generation
  useEffect(() => {
    const interval = setInterval(() => {
      const newAlert = generateAlert();
      setAlerts(prev => [newAlert, ...prev].slice(0, 50)); // Keep last 50
    }, 4000); // New alert every 4 seconds

    return () => clearInterval(interval);
  }, []);

  // Update graph periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setGraphData(generateGraphData());
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Generate trend data
  const trendData = [
    { time: '00:00', threats: 12 },
    { time: '04:00', threats: 19 },
    { time: '08:00', threats: 27 },
    { time: '12:00', threats: 35 },
    { time: '16:00', threats: 42 },
    { time: '20:00', threats: 38 },
    { time: '23:59', threats: 31 },
  ];

  const distributionData = [
    { name: 'Email', value: 45 },
    { name: 'SMS', value: 25 },
    { name: 'Web', value: 20 },
    { name: 'AI-Generated', value: 10 },
  ];

  const stats = {
    activeAlerts: alerts.filter(a => a.status === 'Active').length,
    totalScanned: 12847,
    accuracy: '97.8%',
    zeroDay: 24
  };

  return (
    <div className="min-h-screen bg-dark-bg grid-bg">
      {/* Header */}
      <header className="border-b border-gray-800 bg-dark-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className="p-2 bg-neon-green/10 rounded-lg"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Shield className="w-8 h-8 text-neon-green" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <span className="text-neon-green">PhishGuard</span>
                  <span className="text-white">AI</span>
                </h1>
                <p className="text-xs text-gray-400">Real-Time Phishing Detection & Prevention</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-neon-green/10 rounded-full border border-neon-green/30">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                <span className="text-sm text-neon-green font-semibold">System Active</span>
              </div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors lg:hidden"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            <Dashboard alerts={alerts} stats={stats} />
            <AlertsTable alerts={alerts} onViewDetails={setSelectedAlert} />
            <Analyzer />
            <TrendCharts trendData={trendData} distributionData={distributionData} />
          </div>

          {/* Sidebar */}
          <div className={`space-y-6 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
            <SystemStatus />
            <ThreatGraph graphData={graphData} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-12 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            Powered by <span className="text-neon-green font-semibold">DeepGuard AI Engine</span> v3.2
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Frontend-Only Simulation • No Backend Required
          </p>
        </div>
      </footer>

      {/* Explain Panel Modal */}
      {selectedAlert && (
        <ExplainPanel 
          alert={selectedAlert} 
          onClose={() => setSelectedAlert(null)} 
        />
      )}
    </div>
  );
}

export default App;
