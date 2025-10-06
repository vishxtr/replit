import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Network } from 'lucide-react';

const ThreatGraph = ({ graphData }) => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    setNodes(graphData.nodes || []);
  }, [graphData]);

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Network className="w-5 h-5 text-neon-blue" />
        <h2 className="text-xl font-bold">Threat Network Map</h2>
        <div className="ml-auto text-xs text-gray-500">Live Graph</div>
      </div>

      <div className="relative h-80 bg-gray-900 rounded-lg overflow-hidden">
        <svg className="w-full h-full">
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Render connections */}
          {graphData.links?.map((link, i) => {
            const sourceNode = nodes.find(n => n.id === link.source);
            const targetNode = nodes.find(n => n.id === link.target);
            
            if (!sourceNode || !targetNode) return null;
            
            const x1 = (sourceNode.val * 30) % 800;
            const y1 = (sourceNode.val * 25) % 300;
            const x2 = (targetNode.val * 30) % 800;
            const y2 = (targetNode.val * 25) % 300;

            return (
              <motion.line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(0, 255, 136, 0.3)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: i * 0.05 }}
              />
            );
          })}

          {/* Render nodes */}
          {nodes.map((node, i) => {
            const x = (node.val * 30) % 800;
            const y = (node.val * 25) % 300;
            const radius = node.threat === 'High' ? 8 : node.threat === 'Medium' ? 6 : 4;
            const color = node.threat === 'High' ? '#ef4444' : node.threat === 'Medium' ? '#eab308' : '#22c55e';

            return (
              <g key={node.id}>
                <motion.circle
                  cx={x}
                  cy={y}
                  r={radius}
                  fill={color}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="cursor-pointer"
                />
                <motion.circle
                  cx={x}
                  cy={y}
                  r={radius + 3}
                  fill="none"
                  stroke={color}
                  strokeWidth="1"
                  opacity="0.5"
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.1 }}
                />
              </g>
            );
          })}
        </svg>

        <div className="absolute bottom-4 left-4 flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-400">High Threat</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-400">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-400">Low</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatGraph;
