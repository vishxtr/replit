import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, CheckCircle, XCircle } from 'lucide-react';

const Analyzer = () => {
  const [text, setText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const analyzeText = async () => {
    if (!text.trim()) return;
    
    setAnalyzing(true);
    setResult(null);

    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const confidence = (85 + Math.random() * 14).toFixed(1);
    const isPhishing = confidence > 90;

    const reasons = [
      'Urgent language patterns detected',
      'Suspicious link structure found',
      'Brand impersonation indicators present',
      'Unusual sender patterns identified',
      'Request for sensitive information detected'
    ];

    const selectedReasons = reasons
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 3) + 2);

    setResult({
      isPhishing,
      confidence,
      reasons: selectedReasons,
      action: isPhishing ? 'Delete immediately and report to IT security' : 'Appears safe, but remain cautious'
    });

    setAnalyzing(false);
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="text-neon-green">AI</span> Email/SMS Analyzer
      </h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste email content or SMS message here for AI analysis..."
        className="w-full h-32 bg-gray-900 border border-gray-700 rounded-lg p-3 text-gray-100 placeholder-gray-500 focus:border-neon-green focus:outline-none transition-colors"
      />

      <button
        onClick={analyzeText}
        disabled={analyzing || !text.trim()}
        className="mt-4 btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {analyzing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Analyzing with AI...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Analyze Content
          </>
        )}
      </button>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 p-4 bg-gray-900 rounded-lg border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-4">
              {result.isPhishing ? (
                <XCircle className="w-8 h-8 text-red-500" />
              ) : (
                <CheckCircle className="w-8 h-8 text-green-500" />
              )}
              <div>
                <h3 className="text-lg font-bold">
                  {result.isPhishing ? 'Phishing Detected' : 'Likely Safe'}
                </h3>
                <p className="text-sm text-gray-400">AI Confidence: {result.confidence}%</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-semibold text-gray-400 mb-2">Detection Reasons:</h4>
                <ul className="space-y-1">
                  {result.reasons.map((reason, index) => (
                    <li key={index} className="text-sm text-gray-300 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-neon-green rounded-full"></div>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-gray-800">
                <h4 className="text-sm font-semibold text-gray-400 mb-1">Recommended Action:</h4>
                <p className="text-sm text-gray-300">{result.action}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Analyzer;
