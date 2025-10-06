import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Eye } from 'lucide-react';

const AlertsTable = ({ alerts, onViewDetails }) => {
  const getBadgeClass = (level) => {
    switch (level) {
      case 'High': return 'badge-high';
      case 'Medium': return 'badge-medium';
      case 'Low': return 'badge-low';
      default: return 'badge-low';
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="w-5 h-5 text-neon-green" />
        <h2 className="text-xl font-bold">Live Threat Feed</h2>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-400">Live</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">Time</th>
              <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">Domain</th>
              <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">Threat Level</th>
              <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">Detection Type</th>
              <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">AI Confidence</th>
              <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {alerts.slice(0, 10).map((alert, index) => (
                <motion.tr
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                >
                  <td className="py-3 px-4 text-sm text-gray-300">{formatTime(alert.timestamp)}</td>
                  <td className="py-3 px-4">
                    <div className="text-sm font-mono text-neon-blue">{alert.domain}</div>
                    <div className="text-xs text-gray-500">{alert.sender}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={getBadgeClass(alert.threatLevel)}>{alert.threatLevel}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-300">{alert.detectionType}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-neon-green h-full rounded-full transition-all"
                          style={{ width: `${alert.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-300">{alert.confidence}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => onViewDetails(alert)}
                      className="flex items-center gap-1 text-neon-green hover:text-neon-blue transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">Details</span>
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlertsTable;
