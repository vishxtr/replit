import React from 'react';
import { jsPDF } from 'jspdf';

const PDFGenerator = ({ alerts }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('SOC Alerts Report', 10, 10);
    alerts.forEach((alert, i) => {
      doc.text(`ID: ${alert.id} | Severity: ${alert.severity} | Explanation: ${alert.explanation}`, 10, 20 + i * 10);
    });
    doc.save('alerts_report.pdf');
  };

  return (
    <button className="btn" onClick={generatePDF} disabled={!alerts.length}>
      Export Alerts to PDF
    </button>
  );
};

export default PDFGenerator;
