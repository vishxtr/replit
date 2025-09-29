import React from 'react';

const AlertsTable = ({ alerts, loading, onViewDetails, onApplyRemediation }) => (
  <div className="overflow-x-auto">
    {loading ? (
      <div className="spinner">Loading...</div>
    ) : (
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Severity</th>
            <th>Explanation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map(alert => (
            <tr key={alert.id}>
              <td>{alert.id}</td>
              <td>{alert.severity}</td>
              <td>{alert.explanation}</td>
              <td>
                <button className="btn" onClick={() => onViewDetails(alert.id)}>View Details</button>
                <button className="btn" onClick={() => onApplyRemediation(alert.id)}>Apply Remediation</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

export default AlertsTable;
