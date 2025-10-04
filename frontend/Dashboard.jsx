import React, { useState, useEffect } from 'react';
import AlertsTable from './AlertsTable';
import AlertModal from './AlertModal';
import PDFGenerator from './PDFGenerator';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [severityFilter, setSeverityFilter] = useState('All');
  

  // Fetch alerts
  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/alerts');
      const data = await res.json();
      setAlerts(data);
    } catch (err) {
      toast.error('Failed to fetch alerts');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  // Start simulation
  const startSimulation = async () => {
    setSimulating(true);
    toast.loading('Starting simulation...');
    try {
      await fetch('/api/simulate/start', { method: 'POST' });
      toast.success('Simulation started');
      fetchAlerts();
    } catch {
      toast.error('Failed to start simulation');
    }
    toast.dismiss();
  };

  // Stop simulation
  const stopSimulation = async () => {
    setSimulating(false);
    toast.loading('Stopping simulation...');
    try {
      await fetch('/api/simulate/stop', { method: 'POST' });
      toast.success('Simulation stopped');
    } catch {
      toast.error('Failed to stop simulation');
    }
    toast.dismiss();
  };

  // Filter alerts
  const filteredAlerts = severityFilter === 'All'
    ? alerts
    : alerts.filter(a => a.severity === severityFilter);

  return (
    <div className="p-6">
      <div className="flex gap-2 mb-4">
        <button className="btn" onClick={startSimulation} disabled={simulating}>Start Simulation</button>
        <button className="btn" onClick={stopSimulation} disabled={!simulating}>Stop Simulation</button>
        <button className="btn" onClick={fetchAlerts}>Refresh Alerts</button>
        
      </div>
      <div className="flex gap-2 mb-4">
        {['All', 'High', 'Medium', 'Low'].map(sev => (
          <button
            key={sev}
            className={`btn ${severityFilter === sev ? 'btn-active' : ''}`}
            onClick={() => setSeverityFilter(sev)}
          >
            {sev}
          </button>
        ))}
      </div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">Alerts</h2>
        <PDFGenerator alerts={filteredAlerts} />
      </div>
      <AlertsTable
        alerts={filteredAlerts}
        loading={loading}
        onViewDetails={setSelectedAlert}
        onApplyRemediation={async (id) => {
          toast.loading('Applying remediation...');
          try {
            const res = await fetch(`/api/remediate/${id}`, { method: 'POST' });
            const result = await res.json();
            if (result.success) toast.success('Remediation applied');
            else toast.error('Remediation failed');
            fetchAlerts();
          } catch {
            toast.error('Remediation failed');
          }
          toast.dismiss();
        }}
      />
      {selectedAlert && (
        <AlertModal
          alertId={selectedAlert}
          onClose={() => setSelectedAlert(null)}
        />
      )}
      
    </div>
  );
};

export default Dashboard;
