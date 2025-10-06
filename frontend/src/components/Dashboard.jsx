import { useState, useEffect } from 'react';
import { Activity, Shield, AlertTriangle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = ({ alerts, stats }) => {
  const [activeAlerts, setActiveAlerts] = useState(0);
  const [linksScanned, setLinksScanned] = useState(0);

  useEffect(() => {
    setActiveAlerts(alerts.filter(a => a.status === 'Active').length);
    
    // Simulate incrementing stats
    const interval = setInterval(() => {
      setLinksScanned(prev => prev + Math.floor(Math.random() * 5));
    }, 3000);

    return () => clearInterval(interval);
  }, [alerts]);

  const StatCard = ({ title, value, icon: Icon, trend, color = 'neon-green' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="stat-card"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className={`text-3xl font-bold mt-1 text-${color}`}>{value}</p>
          {trend && <p className="text-xs text-gray-500 mt-1">{trend}</p>}
        </div>
        <div className={`p-3 bg-${color}/10 rounded-lg`}>
          <Icon className={`w-6 h-6 text-${color}`} />
        </div>
      </div>
      <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-${color}`}
          initial={{ width: 0 }}
          animate={{ width: '75%' }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>
    </motion.div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Active Phishing Alerts"
        value={activeAlerts}
        icon={AlertTriangle}
        trend="+12% from last hour"
        color="red-500"
      />
      <StatCard
        title="Links Scanned"
        value={12847 + linksScanned}
        icon={Shield}
        trend="Real-time monitoring"
        color="neon-green"
      />
      <StatCard
        title="Detection Accuracy"
        value="97.8%"
        icon={TrendingUp}
        trend="ML Model v3.2"
        color="neon-blue"
      />
      <StatCard
        title="Zero-Day Detections"
        value="24"
        icon={Activity}
        trend="Last 24 hours"
        color="yellow-500"
      />
    </div>
  );
};

export default Dashboard;
