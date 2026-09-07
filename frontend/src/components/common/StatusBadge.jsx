import React from 'react';

const StatusBadge = ({ status }) => {
  const getStatusLabel = (st) => {
    switch (st) {
      case 'open': return 'Open for Applications';
      case 'under_evaluation': return 'Under Evaluation';
      case 'in_review': return 'In Review';
      case 'shortlisted': return 'Shortlisted';
      case 'selected_pilot': return 'Selected for Pilot';
      case 'pilot': return 'Pilot Stage';
      case 'procured': return 'Procured & Scaled';
      case 'completed': return 'Completed';
      case 'draft': return 'Draft Stage';
      default: return st?.replace('_', ' ') || 'Pending';
    }
  };

  return (
    <span className={`status-badge ${status || 'draft'}`}>
      <span className="badge-dot"></span>
      {getStatusLabel(status)}
    </span>
  );
};

export default StatusBadge;
