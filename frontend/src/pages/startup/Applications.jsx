import React from 'react';
import StartupLayout from '../../layouts/StartupLayout';
import { MOCK_APPLICATIONS } from '../../data/mockData';
import ApplicationCard from '../../components/startup/ApplicationCard';
import { FileText, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';

const StartupApplications = ({ currentUser, onRoleChange }) => {
  return (
    <StartupLayout currentUser={currentUser} onRoleChange={onRoleChange}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.6rem', color: '#0B2545', marginBottom: '0.25rem' }}>
          My Challenge Applications & Tracking
        </h1>
        <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
          Track real-time evaluation feedback, multi-expert scores, and pilot selection stages.
        </p>
      </div>

      <div className="cards-grid">
        {MOCK_APPLICATIONS.map((app) => (
          <ApplicationCard
            key={app.id}
            application={app}
            onViewProgress={(a) => alert(`Tracking detailed evaluation audit log for ${a.id}`)}
          />
        ))}
      </div>
    </StartupLayout>
  );
};

export default StartupApplications;
