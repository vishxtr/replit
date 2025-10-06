import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, PieChart as PieIcon } from 'lucide-react';

const TrendCharts = ({ trendData, distributionData }) => {
  const COLORS = ['#00ff88', '#00d4ff', '#eab308', '#ef4444'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Phishing Activity Trend */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-neon-green" />
          <h2 className="text-lg font-bold">Phishing Activity Trend</h2>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="time" stroke="#666" style={{ fontSize: '12px' }} />
            <YAxis stroke="#666" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1a1a24', border: '1px solid #333' }}
              labelStyle={{ color: '#00ff88' }}
            />
            <Line
              type="monotone"
              dataKey="threats"
              stroke="#00ff88"
              strokeWidth={2}
              dot={{ fill: '#00ff88', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Threat Source Distribution */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <PieIcon className="w-5 h-5 text-neon-blue" />
          <h2 className="text-lg font-bold">Threat Source Distribution</h2>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={distributionData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {distributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#1a1a24', border: '1px solid #333' }}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px' }}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendCharts;
