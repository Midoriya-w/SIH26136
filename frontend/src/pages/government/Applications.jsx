import React, { useState } from 'react';
import GovernmentLayout from '../../layouts/GovernmentLayout';
import { MOCK_APPLICATIONS } from '../../data/mockData';
import EvaluationStatus from '../../components/government/EvaluationStatus';
import Button from '../../components/common/Button';
import { Award, CheckCircle2, AlertCircle } from 'lucide-react';

const GovernmentApplications = ({ currentUser, onRoleChange }) => {
  const [selectedApp, setSelectedApp] = useState(MOCK_APPLICATIONS[0]);
  const [actionMessage, setActionMessage] = useState('');

  const handleApprovePilot = (app) => {
    setActionMessage(`Pilot funding of ${app.budgetRequested} approved for ${app.startupName}! Official work order issued.`);
  };

  const handleReject = (app) => {
    setActionMessage(`Application ${app.id} marked as Not Selected.`);
  };

  return (
    <GovernmentLayout currentUser={currentUser} onRoleChange={onRoleChange}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.6rem', color: '#0B2545', marginBottom: '0.25rem' }}>
          Pilot Applications & Evaluation Audit
        </h1>
        <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
          Inspect combined randomized multi-expert evaluation reports and award state pilot grants.
        </p>
      </div>

      {actionMessage && (
        <div style={{ background: '#DCFCE7', color: '#166534', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={20} /> {actionMessage}
        </div>
      )}

      {/* Select Application Bar */}
      <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
        {MOCK_APPLICATIONS.map((app) => (
          <button
            key={app.id}
            onClick={() => setSelectedApp(app)}
            style={{
              padding: '0.75rem 1.25rem',
              borderRadius: '12px',
              border: selectedApp?.id === app.id ? '2px solid #0056B3' : '1px solid #CBD5E1',
              background: selectedApp?.id === app.id ? '#EFF6FF' : '#FFFFFF',
              color: selectedApp?.id === app.id ? '#0056B3' : '#1E293B',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              textAlign: 'left'
            }}
          >
            <div>{app.startupName}</div>
            <div style={{ fontSize: '0.725rem', color: '#64748B', fontWeight: 500 }}>
              Score: {app.averageScore ? `${app.averageScore}/100` : 'Pending'}
            </div>
          </button>
        ))}
      </div>

      {selectedApp && (
        <EvaluationStatus
          application={selectedApp}
          onApprovePilot={handleApprovePilot}
          onReject={handleReject}
        />
      )}
    </GovernmentLayout>
  );
};

export default GovernmentApplications;
