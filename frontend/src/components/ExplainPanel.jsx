import { motion, AnimatePresence } from 'framer-motion';
import { X, Brain, Shield, AlertTriangle } from 'lucide-react';
import { generateExplanation } from '../utils/fakeData';

const ExplainPanel = ({ alert, onClose }) => {
  if (!alert) return null;

  const explanation = generateExplanation(alert);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-dark-card border border-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-dark-card border-b border-gray-800 p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-neon-green/10 rounded-lg">
                <Brain className="w-6 h-6 text-neon-green" />
              </div>
              <div>
                <h2 className="text-xl font-bold">AI Threat Analysis</h2>
                <p className="text-sm text-gray-400">Explainable Detection Report</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Alert Summary */}
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-400">Threat Domain</span>
                <span className="font-mono text-neon-blue">{alert.domain}</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-400">Detection Type</span>
                <span className="text-sm">{explanation.type}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">AI Confidence</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-neon-green h-full rounded-full"
                      style={{ width: `${explanation.confidence}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-neon-green">{explanation.confidence}%</span>
                </div>
              </div>
            </div>

            {/* AI Explanation */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-neon-green" />
                Detection Analysis
              </h3>
              <p className="text-gray-300 leading-relaxed">{explanation.explanation}</p>
            </div>

            {/* Threat Indicators */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                Threat Indicators
              </h3>
              <div className="space-y-2">
                {explanation.indicators.map((indicator, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-300">{indicator}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Recommended Actions</h3>
              <div className="space-y-2">
                {explanation.recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-neon-green/5 border border-neon-green/20 rounded-lg"
                  >
                    <div className="w-1.5 h-1.5 bg-neon-green rounded-full mt-1.5"></div>
                    <span className="text-sm text-gray-300">{rec}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExplainPanel;
