import React from 'react';
import { useNavigate } from 'react-router-dom';
import GovernmentLayout from '../../layouts/GovernmentLayout';
import { MOCK_CHALLENGES, MOCK_APPLICATIONS, MOCK_STARTUPS } from '../../data/mockData';
import GovernmentChallengeCard from '../../components/government/ChallengeCard';
import { Landmark, Layers, Users, Award, PlusCircle, TrendingUp, CheckCircle2 } from 'lucide-react';
import Button from '../../components/common/Button';

const GovernmentDashboard = ({ currentUser, onRoleChange }) => {
  const navigate = useNavigate();

  return (
    <GovernmentLayout currentUser={currentUser} onRoleChange={onRoleChange}>
      {/* Department Banner Header */}
      <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#138808', background: '#ECFDF5', padding: '2px 8px', borderRadius: '4px' }}>
            Official State Portal Dashboard
          </span>
          <h1 style={{ fontSize: '1.6rem', color: '#0B2545', marginTop: '4px' }}>
            {currentUser?.department || 'Department of Skills, Employment, Entrepreneurship & Innovation'}
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
            Manage state innovation challenges, monitor randomized multi-expert scoring, and approve pilot grants.
          </p>
        </div>

        <Button variant="saffron" icon={PlusCircle} onClick={() => navigate('/government/create-challenge')}>
          Post New Challenge
        </Button>
      </div>

      {/* Analytics Metric Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <div className="metric-card">
          <div className="metric-icon blue"><Layers size={24} /></div>
          <div>
            <div className="metric-value">5</div>
            <div className="metric-label">Active State Challenges</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon purple"><Users size={24} /></div>
          <div>
            <div className="metric-value">79</div>
            <div className="metric-label">Startup Proposals Received</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon green"><Award size={24} /></div>
          <div>
            <div className="metric-value">₹ 3.75 Cr</div>
            <div className="metric-label">Total Allocated Pilot Funds</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon orange"><TrendingUp size={24} /></div>
          <div>
            <div className="metric-value">3</div>
            <div className="metric-label">Pilots Converted to Procurement</div>
          </div>
        </div>
      </div>

      {/* Posted Department Challenges */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', color: '#0B2545' }}>Department Active Challenges</h2>
            <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Track applicant counts and evaluation queue</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/government/challenges')}>
            Manage All Challenges
          </Button>
        </div>

        <div className="cards-grid">
          {MOCK_CHALLENGES.slice(0, 3).map((ch) => (
            <GovernmentChallengeCard
              key={ch.id}
              challenge={ch}
              onViewApplications={(c) => navigate('/government/applications')}
            />
          ))}
        </div>
      </div>

      {/* Evaluation & Pilot Action Table */}
      <div className="table-container">
        <div style={{ padding: '1.25rem', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#0B2545' }}>Shortlisted Proposals Ready for Committee Decision</h3>
            <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Multi-expert combined evaluation reports completed</p>
          </div>
          <Button variant="navy" size="sm" onClick={() => navigate('/government/applications')}>
            View Full Evaluation Queue
          </Button>
        </div>

        <table className="custom-table">
          <thead>
            <tr>
              <th>App ID</th>
              <th>Startup Entity</th>
              <th>Challenge Problem</th>
              <th>Avg Score</th>
              <th>Pilot Budget</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_APPLICATIONS.map((app) => (
              <tr key={app.id}>
                <td><strong>{app.id}</strong></td>
                <td>{app.startupName}</td>
                <td style={{ maxWidth: '280px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{app.challengeTitle}</td>
                <td><strong style={{ color: '#138808' }}>{app.averageScore || 'Pending'}/100</strong></td>
                <td>{app.budgetRequested}</td>
                <td><span className={`status-badge ${app.status}`}><span className="badge-dot"></span>{app.status}</span></td>
                <td>
                  <Button variant="primary" size="sm" onClick={() => navigate('/government/applications')}>
                    Review Report
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GovernmentLayout>
  );
};

export default GovernmentDashboard;
