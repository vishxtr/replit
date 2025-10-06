import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Activity, Zap } from 'lucide-react';
import { generateSystemStats } from '../utils/fakeData';

const SystemStatus = () => {
  const [stats, setStats] = useState(generateSystemStats());

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(generateSystemStats());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card">
      <h2 className="text-lg font-bold mb-4">System Status</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-neon-blue" />
            <span className="text-sm text-gray-400">CPU Load</span>
          </div>
          <span className="text-sm font-semibold text-neon-green">{stats.cpuLoad}%</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-neon-green" />
            <span className="text-sm text-gray-400">Model Uptime</span>
          </div>
          <span className="text-sm font-semibold text-neon-green">{stats.uptime}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-gray-400">API Latency</span>
          </div>
          <span className="text-sm font-semibold text-neon-green">{stats.apiLatency}ms</span>
        </div>

        <div className="pt-3 border-t border-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">AI Model Version</span>
            <span className="text-xs font-mono text-gray-400">{stats.modelVersion}</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">Threats Blocked (24h)</span>
            <span className="text-xs font-semibold text-neon-green">{stats.threatsBlocked.toLocaleString()}</span>
          </div>
        </div>

        <motion.div
          className="w-full h-1 bg-gray-800 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-neon-green to-neon-blue"
            animate={{ width: ['0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SystemStatus;
