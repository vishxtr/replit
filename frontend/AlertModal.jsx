import React, { useEffect, useState } from 'react';

const AlertModal = ({ alertId, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const res = await fetch(`/api/alerts/${alertId}`);
      const data = await res.json();
      setDetails(data);
      setLoading(false);
    };
    fetchDetails();
  }, [alertId]);

  if (!details) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        {loading ? (
          <div className="spinner">Loading...</div>
        ) : (
          <>
            <h2>Alert Details</h2>
            <p><b>ID:</b> {details.id}</p>
            <p><b>Severity:</b> {details.severity}</p>
            <p><b>Explanation:</b> {details.explanation}</p>
            <p><b>Evidence:</b> {details.evidence}</p>
            <p><b>Recommended Remediation:</b> {details.remediation}</p>
            <button className="btn" onClick={onClose}>Close</button>
          </>
        )}
      </div>
    </div>
  );
};

export default AlertModal;
